import json

import os

import hashlib

from uuid import uuid1

from xcrafter import api
from xcrafter import app

from flask import redirect
from flask import url_for
from flask import abort
from flask import jsonify
from flask import Response
from flask import request

from flask_login import login_required
from flask_login import current_user

from flask_restful import Resource
from flask_restful import reqparse

from xcrafter.db_utils.products import get_product
from xcrafter.db_utils.products import add_product
from xcrafter.db_utils.products import delete_product_by_id
from xcrafter.db_utils.products import edit_product
from xcrafter.db_utils.products import get_all_products
from xcrafter.db_utils.products import add_product_photo

from xcrafter.db_utils.users import sign_up
from xcrafter.db_utils.users import get_user_by_id
from xcrafter.db_utils.users import send_mail

from xcrafter.db_utils.subscriptions import get_subscription
from xcrafter.db_utils.subscriptions import add_subscription

from loguru import logger

from xcrafter.models import Product
from xcrafter.models import Subscription


class GetProductInfoById(Resource):
    def get(self, id):
        product = get_product(id)
        return json.dumps(product.get_info())


class AddItemInCatalog(Resource):
    @login_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title')
        parser.add_argument('description')
        parser.add_argument('price')
        parser.add_argument('photo')
        parser.add_argument('seller_id')
        args = parser.parse_args()
        try:
            result = add_product(args, current_user)
            return jsonify({'sucess': 'true', 'product': result})
        except Exception as e:
            if str(e) == 'Большое количество товаров':
                return jsonify({'sucess': 'false', 'error': 'Можно добавить не более 10 товаров'})
            logger.warning('Ошибка при добавлении пользователем нового товара: {}'.format(e))
            return jsonify({'sucess': 'false', 'error': 'По техническим причинам мы не можем сейчас добавить Ваш'
                                                        'товар. Попробуйте, пожалуйста, попозже.'})


class DeleteItemInDB(Resource):
    @login_required
    def delete(self, id):
        delete_product_by_id(id)


class EditCardItem(Resource):
    @login_required
    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id')
        parser.add_argument('title')
        parser.add_argument('description')
        parser.add_argument('price')
        parser.add_argument('photo')
        args = parser.parse_args()
        result = edit_product(args)
        return result


class Registration(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name')
        parser.add_argument('surname')
        parser.add_argument('email')
        parser.add_argument('phone')
        parser.add_argument('password')
        parser.add_argument('agreement')
        args = parser.parse_args()
        if args['agreement'] == "True":
            args['agreement'] = True

        sign_up_result = sign_up(args)

        if sign_up_result is not None:
            user = get_user_by_id(sign_up_result)
            if user is not None:
                send_mail(user.email, user.activate_key)
                return Response(status=201)

        return abort(403)


class GetAllProducts(Resource):
    def get(self):
        try:
            products = get_all_products()
            result = {'products': products, 'total': len(products), 'success': 'true'}
        except:
            result = {'success': 'false'}

        return json.dumps(result)


class UploadPhoto(Resource):
    @login_required
    def post(self):
        cur_id = str(current_user.id)
        hash_user_id = hashlib.md5(cur_id.encode('UTF-8')).hexdigest()
        path = os.path.join(app.root_path, 'static', 'uploads', hash_user_id)
        if not os.path.exists(path):
            os.makedirs(path)

        def allowed_file(filenames):
            files = filenames.lower()
            if '.' in files and files.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']:
                return True
            raise Exception('Файл не правильного формата')

        file = request.files['file']

        if not file.filename:
            return jsonify({'sucess': 'false', 'error': 'Нет файла'})

        try:
            product_id = request.form["product_id"]
            allowed_file(file.filename)
            filename = str(uuid1()) + '.' + file.filename.rsplit('.', 1)[1]
            file.save(os.path.join(path, filename))
            add_product_photo(os.path.join(path, filename), cur_id, product_id)
            return jsonify({'sucess': 'true', 'path': os.path.join(path, filename)})
        except Exception as e:
            if str(e) == 'Файл не правильного формата':
                return jsonify({'sucess': 'false', 'error': 'Файл должен быть формата png, jpg или jpeg'})
            elif str(e) == 'Большое количество фотогорафий':
                return jsonify({'sucess': 'false', 'error': 'Можно добавлять не более 5 фотографий'})
            else:
                logger.warning('Ошибка при сохранении фотографии пользователем: {}'.format(e))
                return jsonify({'sucess': 'false',
                                'error': 'По техническим причинам сейчас нет возможности сохранить '
                                         'Вашу фотографию, попробуйте, пожалуйста, позже.'})

              
class SetViewCount(Resource):
    def get(self, product_id):
        product = get_product(product_id)
        product.change_view_count()
        return product.view_count


class AddSubscription(Resource):
    def get(self):
        email = request.args.get('q')
        if email:
            subscription = get_subscription(email)
            if subscription is None:
                add_subscription(email)
            else:
                if not subscription.is_active:
                    subscription.set_active()
        return redirect(url_for('index'))


api.add_resource(Registration, '/api/registration') #TODO добавить версию api
api.add_resource(GetProductInfoById, '/get-product-by-id/<int:id>')
api.add_resource(AddItemInCatalog, '/api/add-card-item-in-catalog')
api.add_resource(DeleteItemInDB, '/api/delete-item/<int:id>')
api.add_resource(EditCardItem, '/api/edit-card-item')
api.add_resource(GetAllProducts, '/api/v1/products/all')
api.add_resource(UploadPhoto, '/api/v1/uploads/photo')
api.add_resource(SetViewCount, '/api/<int:product_id>/product_view')
api.add_resource(AddSubscription, '/api/v1/subscribe')
