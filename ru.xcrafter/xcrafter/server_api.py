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
from flask_login import login_user
from flask_login import logout_user

from flask_restful import Resource
from flask_restful import reqparse

from xcrafter.db_utils.products import get_product
from xcrafter.db_utils.products import add_product
from xcrafter.db_utils.products import delete_product
from xcrafter.db_utils.products import edit_product
from xcrafter.db_utils.products import get_all_products
from xcrafter.db_utils.products import add_product_photo

from xcrafter.db_utils.users import sign_up
from xcrafter.db_utils.users import get_user_by_id
from xcrafter.db_utils.users import send_mail
from xcrafter.db_utils.users import get_user_by_email
from xcrafter.db_utils.users import send_new_password_on_email
from xcrafter.db_utils.users import gen_random_password
from xcrafter.db_utils.users import change_password
from xcrafter.db_utils.users import send_password_reset_email
from xcrafter.db_utils.users import password_verification

from xcrafter.db_utils.subscriptions import get_subscription
from xcrafter.db_utils.subscriptions import add_subscription

from loguru import logger

from werkzeug.utils import secure_filename

from werkzeug.urls import url_parse

from xcrafter.models import Product
from xcrafter.models import User
from xcrafter.models import Subscription


class GetProductInfoById(Resource):
    def get(self, product_id):
        product = get_product(product_id)
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


class DeleteProduct(Resource):
    @login_required
    def post(self, product_id):
        return delete_product(product_id)


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
        try:
            surname = secure_filename(request.form['surname'])
            name = secure_filename(request.form['name'])
            email = request.form['email']
            phone = secure_filename(request.form['phone'])
            password = request.form['password']
            is_agree = request.form.getlist('agreement')
            if not is_agree:
                raise Exception('Отсутствует согласие на обработку персональных данных')
            else:
                agreement = True

        except Exception as e:
            logger.warning('Получены не корректные данные при регистрации: {}'.format(str(e)))
            return jsonify({'success': 'false', 'error': 'Не корректные данные'})

        try:
            registered_user = sign_up({'name': name, 'surname': surname, 'email': email,
                                      'phone': phone, 'password': password, 'agreement': agreement})
        except Exception as e:
            logger.warning('Ошибка записи нового пользователя в БД: {}'.format(str(e)))
            return jsonify({'success': 'false', 'error': 'Ошибка записи в БД'})

        try:
            send_mail(registered_user.email, registered_user.activate_key)
        except Exception as e:
            logger.warning('Ошибка при отправки активационного письма: {}'.format(str(e)))
            return jsonify({'success': 'false', 'error': 'Ошибка отправки активационного письма'})

        return redirect(url_for('get_sign_in'))


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
        email = request.args.get('email_address')
        if email:
            subscription = get_subscription(email)
            if subscription is None:
                add_subscription(email)
            else:
                if not subscription.is_active:
                    subscription.set_active()
        return redirect(url_for('index'))


class RecoveryPassword(Resource):
    def post(self):
        if current_user.is_authenticated:
            return redirect(url_for('index'))
        try:
            email_user = request.form['email']
            user = get_user_by_email(email_user)
            send_password_reset_email(user)
            return jsonify({'success': 'true'})
        except Exception as e:
            if str(e) == 'Не удалось найти пользователя':
                return jsonify({'success': 'false', 'error': 'Пользователя с таким email нет'})
            logger.warning('Не удалось отправить письмо: {}'.format(str(e)))
            return jsonify({'success': 'false', 'error': 'По техническим причинам сейчас нет возможности поменять '
                                                         'пароль, попробуйте, пожалуйста, позже.'})


class ResetPassword(Resource):
    def get(self, token):
        if current_user.is_authenticated:
            return redirect(url_for('index'))
        try:
            user = User.verify_reset_password_token(token)
        except Exception as e:
            logger.warning('Не удалось получить user при декоде токена: {}'.format(str(e)))
            return jsonify({'success': 'false', 'error': 'По техническим причинам сейчас нет возможности поменять'
                                                         'пароль, попробуйте, пожалуйста, позже.'})
        if not user:
            return redirect(url_for('index'))
        try:
            password = gen_random_password()
            change_password(password, user)
            send_new_password_on_email(user.email, password)
            return jsonify({'success': 'true'})
        except Exception as e:
            logger.warning('Не удалось отправить письмо: {}'.format(str(e)))
            return jsonify({'success': 'false', 'error': 'По техническим причинам сейчас нет возможности поменять'
                                                         'пароль, попробуйте, пожалуйста, позже.'})


class SignIn(Resource):
    def post(self):
        try:
            email_user = request.form['email']
            password_user = request.form['password']
            remember_user = request.form.getlist('remember-check')
            next_page = request.form['next_page']
        except Exception as e:
            logger.warning('Не удалось получить логин и/или пароль при авторизации: {}'.format(str(e)))
            return jsonify({'success': 'false', 'error': 'По техническим причинам сейчас нет возможности Вас '
                                                         'авторизовать, попробуйте, пожалуйста, позже.'})
        try:
            user = get_user_by_email(email_user)
        except Exception as e:
            if e == 'Не удалось найти пользователя':
                return jsonify({'success': 'false', 'error': 'Пользователя с таким email нет'})
            logger.warning('Не удалось получить пользователя из БД: {}'.format(str(e)))
            return jsonify({'success': 'false', 'error': 'По техническим причинам сейчас нет возможности Вас '
                                                         'авторизовать, попробуйте, пожалуйста, позже.'})
        try:
            result_password_verification = password_verification(user, password_user)
        except Exception as e:
            logger.warning('Не удалось проверить пароль: {}'.format(str(e)))
            return jsonify({'success': 'false', 'error': 'По техническим причинам сейчас нет возможности Вас '
                                                         'авторизовать, попробуйте, пожалуйста, позже.'})

        if result_password_verification:
            try:
                login_user(user, remember=remember_user)
            except Exception as e:
                logger.warning('Не удалось авторизировать пользователя: {}'.format(str(e)))
                return jsonify({'success': 'false', 'error': 'По техническим причинам сейчас нет возможности Вас '
                                                             'авторизовать, попробуйте, пожалуйста, позже.'})
            if next_page == 'None' or url_parse(next_page).netloc != '':
                next_page = url_for('index')
            return redirect(next_page)
        else:
            return jsonify({'success': 'false', 'message': 'Не верный пароль'})


class Logout(Resource):
    def get(self):
        try:
            logout_user()
            return redirect(url_for('index'))
        except Exception as e:
            logger.warning('Не удалось сделать logout пользователю: {}'.format(str(e)))
            return jsonify({'success': 'false'})


class ChangePassword(Resource):
    @login_required
    def post(self):
        old_password = request.form['old-password']
        new_password = request.form['new-password']
        new_password_repeat = request.form['new-password-repeat']
        if new_password != new_password_repeat:
            return jsonify({'success': 'false', 'error': 'Пароли не совпадают'})
        try:
            result_password_verification = password_verification(current_user, old_password)
        except Exception as e:
            logger.warning('Не удалось проверить пароль: {}'.format(str(e)))
            return jsonify({'success': 'false', 'error': 'По техническим причинам сейчас нет возможности сменить '
                                                         'пароль, попробуйте, пожалуйста, позже.'})
        if result_password_verification:
            try:
                change_password(new_password, current_user)
                return jsonify({'success': 'true'})
            except Exception as e:
                logger.warning('Не удалось сменить пароль: {}'.format(str(e)))
                return jsonify({'success': 'false', 'error': 'По техническим причинам сейчас нет возможности сменить '
                                                             'пароль, попробуйте, пожалуйста, позже.'})
        else:
            return jsonify({'success': 'false', 'error': 'Введен неверный пароль'})


class GetAnswerTheQuestion(Resource):
    def get(self):


        pass


api.add_resource(Registration, '/api/registration')  # TODO добавить версию api
api.add_resource(GetProductInfoById, '/get-product-by-id/<int:id>')
api.add_resource(AddItemInCatalog, '/api/add-card-item-in-catalog')
api.add_resource(DeleteProduct, '/api/v1/delete-product/<int:product_id>')
api.add_resource(EditCardItem, '/api/edit-card-item')
api.add_resource(GetAllProducts, '/api/v1/products/all')
api.add_resource(UploadPhoto, '/api/v1/uploads/photo')
api.add_resource(SetViewCount, '/api/<int:product_id>/product_view')
api.add_resource(AddSubscription, '/api/v1/subscribe')
api.add_resource(RecoveryPassword, '/api/v1/recovery-password')
api.add_resource(ResetPassword, '/api/v1/reset-password/<string:token>')
api.add_resource(SignIn, '/api/v1/sign-in')
api.add_resource(Logout, '/api/v1/logout')
api.add_resource(ChangePassword, '/api/v1/change-password')
api.add_resource(GetAnswerTheQuestion, '/api/v1/get-answer')

