import sqlalchemy
from sqlalchemy.exc import InvalidRequestError
from sqlalchemy.orm.exc import NoResultFound
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import Users, Products
from app import db


def sign_up(sign_up_data: {}) -> {}:
    """Регистрация(принимает словарь{'firstName':'', 'secondName':'', 'email':'', 'phone':'', 'password':''}),
     возвращает словать({"email": "(строка ok/err)", "phone": "(строка ok/err)"})"""

    sign_up_result = {"email": "ok", "phone": "ok"}

    password_hash = generate_password_hash(sign_up_data['password'])
    user = Users(first_name=sign_up_data['firstName'], surname=sign_up_data['secondName'], email=sign_up_data['email'],
                 phone_number=sign_up_data['phone'], password_hash=password_hash)

    db.session.add(user)
    try:
        db.session.commit()
    except sqlalchemy.exc.IntegrityError as e:
        db.session.rollback()
        try:
            Users.query.filter(Users.email == sign_up_data['email']).one()
            sign_up_result['email'] = 'err'
        except NoResultFound:
            # ignore (если не нашлось такого поля - значит проблема не в дубликате email)
            pass
        try:
            Users.query.filter(Users.phone_number == sign_up_data['phone']).one()
            sign_up_result['phone'] = 'err'
        except NoResultFound:
            # ignore (если не нашлось такого поля - значит проблема не в дубликате phone)
            pass

    return sign_up_result


def sign_in(sign_in_data) -> {}:
    """Проверка для авторизации(принимает словарь {'email':'', 'password':''}),
    возвращает словарь {"email": "(строка ok/err)", "password": "(строка ok/err)"}"""

    sign_in_result = {"email": "err", "password": "err"}

    try:
        user = Users.query.filter(Users.email == sign_in_data['email']).one()
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
        data = Products.query.filter(Products.seller_id == user_id).all()
    except NoResultFound:
        return []

    for product in data:
        products_for_add = {'id': product.id, 'title': product.title, 'description': product.description,
                            'price': product.price, 'photo': product.photo, 'seller_id': product.seller_id}
        user_products.append(products_for_add)

    return user_products