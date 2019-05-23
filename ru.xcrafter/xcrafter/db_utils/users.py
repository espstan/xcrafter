import sqlalchemy

import random

from sqlalchemy.exc import InvalidRequestError

from sqlalchemy.orm.exc import NoResultFound

from flask import url_for
from flask import render_template

from flask_mail import Message

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

from xcrafter.models import User
from xcrafter.models import Product

from xcrafter import db
from xcrafter import mail


def sign_up(sign_up_data: {}) -> {}:
    """Регистрация(принимает словарь{'firstName':'', 'secondName':'', 'email':'', 'phone':'',
     'password':'', 'agreement': ''}),
     возвращает id юзера при успешной регистрации/ None при не успешной
    """
    # возвращает словать({"email": "(строка ok/err)", "phone": "(строка ok/err)"})"""

    # sign_up_result = {"email": "ok", "phone": "ok"}

    password_hash = generate_password_hash(sign_up_data['password'])
    user = User(first_name=sign_up_data['name'], surname=sign_up_data['surname'], email=sign_up_data['email'],
                 phone_number=sign_up_data['phone'], password_hash=password_hash,
                 agree_to_processing_personal_data=sign_up_data['agreement'])

    db.session.add(user)
    try:
        db.session.commit()
    except sqlalchemy.exc.IntegrityError as e:
        db.session.rollback()
        return None

    return user.id


def sign_in(sign_in_data) -> {}:
    """Проверка для авторизации(принимает словарь {'email':'', 'password':''}),
    возвращает словарь {"email": "(строка ok/err)", "password": "(строка ok/err)"}"""

    sign_in_result = {"email": "err", "password": "err"}

    try:
        user = User.query.filter(User.email == sign_in_data['email']).one()
        if user.active:
            sign_in_result['email'] = 'ok'
    except NoResultFound:
        return sign_in_result

    if check_password_hash(user.password_hash, sign_in_data['password']):
        sign_in_result["password"] = "ok"

    return sign_in_result


def get_user_products(user_id: int) -> []:
    """Получение всех товаров юзера. Принимает user_id.
    Возвращает массив товаров, которые принадлежат данному юзеру"""

    user_products = []

    try:
        data = Product.query.filter(Product.seller_id == user_id).all()
    except NoResultFound:
        return []

    for product in data:
        products_for_add = {'id': product.id, 'title': product.title, 'description': product.description,
                            'price': product.price, 'photo': product.photo, 'seller_id': product.seller_id}
        user_products.append(products_for_add)

    return user_products


def get_user_by_id(user_id: int) -> User:
    """Получение пользователя из бд по id"""

    try:
        user = User.query.filter(User.id == user_id).one()
        return user
    except NoResultFound:
        return None


def send_mail(email, activate_key):
    """Отправка активационной ссылки"""

    try:
        msg = Message("xCrafter new account activation letter.",
                      sender='juniorlabtest@gmail.com',

                      # Отправка активационного письма на почу указанную при регистрации
                      # recipients=[email])

                      # Пока все активационные письма будут отправляться на тестовую почту
                      recipients=['juniorlabtest@gmail.com'])

        link = url_for('activate_account')
        msg.html = 'Для активации аккаунта ' + '<a href="{}">Перейдите по ссылке</a>'.format(link) + \
                   '(User email: {})'.format(email)
        mail.send(msg)
        return "Mail sent!"
    except Exception as e:
        return str(e)


def activate(activate_hash: str):
    """Активаци аккаунта. Сверяются ключи - если совпадают - выставляется флаг 'активен'"""
    try:
        user = User.query.filter(User.activate_key == activate_hash).one()
    except NoResultFound:
        # пока не знаю как обработать
        pass

    if not user.active:
        user.active = True
        db.session.commit()


def get_user_by_email(email: str) -> User:
    """Получение пользователя из бд по email"""

    try:
        user = User.query.filter(User.email == email).one()
        return user
    except NoResultFound:
        raise Exception('Не удалось найти пользователя')


def change_password(password, user):
    try:
        new_password_hash = generate_password_hash(password)
        user.password_hash = new_password_hash
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        raise Exception(str(e))


def send_new_password_on_email(email, password):
    try:
        msg = Message("xCrafter new password",
                      sender='juniorlabtest@gmail.com',
                      recipients=[email])
        msg.html = '<p>Ваш новый пароль: {}</p>'.format(password)
        mail.send(msg)
    except Exception as e:
        raise Exception('Не удалось отправить письмо', e)


def gen_random_password(len=12):
    passwordSymbols = ";*()_+=-,.[]{}1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    result = ""
    for i in range(len):
        result = result + random.choice(passwordSymbols)
    return result


def send_password_reset_email(user):
    try:
        token = user.get_reset_password_token()
        msg = Message("XCrafter. Изменение пароля",
                      sender="juniorlabtest@gmail.com",
                      recipients=[user.email])
        msg.body = 'reset password'
        msg.html = render_template('public/mail-list/reset-password.html', token=token)
        mail.send(msg)
    except Exception as e:
        raise Exception(e)

