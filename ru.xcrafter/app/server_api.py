import json

import os

from uuid import  uuid1

from app import api
from app import app

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

from app.db_utils.products import get_product_by_id
from app.db_utils.products import add_product
from app.db_utils.products import delete_product_by_id
from app.db_utils.products import edit_product
from app.db_utils.products import get_all_products

from app.db_utils.users import sign_up
from app.db_utils.users import get_user_by_id
from app.db_utils.users import send_mail

from loguru import logger


class GetProductInfoById(Resource):
    def get(self, id):
        product_info = get_product_by_id(id)
        return json.dumps(product_info)


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
        result = add_product(args)
        return result


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
    #@login_required
    def post(self):
        path = app.root_path + '/static/uploads/' + str(hash('123'))
        if not os.path.exists(path):
            os.makedirs(path)
        def allowed_file(filename):
            file = filename.lower()
            #ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg']
            #app.config['ALLOWED_EXTENSIONS']
            if '.' in file and file.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']:
                return True
            else:
                raise Exception('Файл не правильного формата')
        try:
            file = request.files['file']
            if file and allowed_file(file.filename):
                filename = str(uuid1()) + '.' + file.filename.rsplit('.', 1)[1]
                file.save(os.path.join(path, filename))
                return json.dumps({'sucess': 'true', 'path': path + filename})
        except Exception as e:
            if str(e) == '413 Request Entity Too Large: The data value transmitted exceeds the capacity limit.':
                return json.dumps({'sucess': 'false', 'причина': 'Объем фотографии не должен превышать 5Мб'})
            elif str(e) == 'Файл не правильного формата':
                return json.dumps({'sucess': 'false', 'причина': 'Файл должен быть формата png, jpg или jpeg'})
            else:
                logger.warning('Ошибка при сохранении фотографии пользователем: {}'.format(e))
                return json.dumps({'sucess': 'false', 'причина': 'По техническим причинам сейчас нет возможности сохранить Вашу фотографию, попробуйте, пожалуйста, позже.'})


api.add_resource(Registration, '/api/registration')
api.add_resource(GetProductInfoById, '/get-product-by-id/<int:id>')
api.add_resource(AddItemInCatalog, '/api/add-card-item-in-catalog')
api.add_resource(DeleteItemInDB, '/api/delete-item/<int:id>')
api.add_resource(EditCardItem, '/api/edit-card-item')
api.add_resource(GetAllProducts, '/api/v1/products/all')
api.add_resource(UploadPhoto, '/api/v1/uploads/photo')

