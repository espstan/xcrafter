import time

from flask import session

from xcrafter import db

from xcrafter.models import Product
from xcrafter.models import Photo

from flask_login import current_user

from sqlalchemy.orm.exc import NoResultFound

from sqlalchemy.exc import OperationalError
from sqlalchemy.exc import SQLAlchemyError

from werkzeug.local import LocalProxy

from loguru import logger

def get_all_products() -> []:
    """Возвращает массив словарей(товаров)"""
    try:
        data = Product.query.all()
        products = []

        for product in data:
            products_for_add = {'id': product.id,
                            'title': product.title,
                            'description': product.description,
                            'price': product.price,
                            'photo': product.photo,
                            'seller_id': product.seller_id}
            products.append(products_for_add)
    except SQLAlchemyError as e:
        err = str(e.__class__.__name__)
        print("SQLAlchemy error: " + err)
    return products


def get_product(product_id: int):
    try:
        product = Product.query.filter(Product.id == product_id).one()
    except NoResultFound as e:
        print("В БД отсутсвует пользователь с идентификатором " + product_id + e)
    return product


def add_product(product: {}, user_id) -> str:
    """Записывает новый товар в бд(в таблицу товаров).
    Принимает словарь {'title': '', 'description': '', 'price': '', 'photo': '', 'seller_id': ''}.
    Возвращает строку ok/err -  добавилось/база не доступна"""

    if check_number_product(user_id):
        raise Exception('Большое количество товаров')

    product_for_add = Product(product['title'],
                              product['description'],
                              product['price'],
                              product['photo'],
                              product['seller_id'])

    db.session.add(product_for_add)

    try:
        db.session.commit()
    except OperationalError as e:
        db.session.rollback()
        raise Exception(str(e))

    return 'ok'


def delete_product(product_id: int):
    """Удаляет продукт из базы. Принимает id товара."""
    try:
        product = Product.query.filter(Product.id == product_id).one()
        if product.seller_id == current_user.id:
            db.session.delete(product)
            db.session.commit()
            return True
        else:
            print("Продукт не может быть удалён текущим пользователем")
    except SQLAlchemyError as e:
        err = str(e.__class__.__name__)
        print("SQLAlchemy error: " + err)
    return False


def edit_product(item: {}):
    """Редактирует поля товара.
     Принимает словарь {'id': '', 'title': '', 'description': '', 'price': '', 'photo': ''}.
     (не обязательно все ключи)"""

    try:
        edited_item = Product.query.filter(Product.id == item['id']).one()

        if 'title' in item.keys():
            edited_item.title = item['title']
        if 'description' in item.keys():
            edited_item.description = item['description']
        if 'price' in item.keys():
            edited_item.price = item['price']
        if 'photo' in item.keys():
            edited_item.photo = item['photo']

        if edited_item.seller_id == current_user.id:
            db.session.commit()

    except NoResultFound:
        # пока не знаю как обработать
        pass


def add_product_photo(path, user_id, product_id):
    photo = Photo(product_id, user_id, path)

    if check_number_product_photo(product_id):
        raise Exception('Большое количество фотографий')

    db.session.add(photo)

    try:
        db.session.commit()
    except OperationalError as e:
        db.session.rollback()
        raise Exception(str(e))

    return 'ok'


def check_number_product_photo(product_id):
    photos = Photo.query.filter(Photo.product_id == product_id).all()
    return len(photos) > 5


def check_number_product(user_id):
    photos = Product.query.filter(Product.seller_id == user_id).all()
    return len(photos) > 10


def get_current_time():
    return int(round(time.time()))


def get_cached_products():
    if not 'start' in session:
        session['start'] = get_current_time()
    current_time = get_current_time()

    if not 'cached_products' in session:
        session['cached_products'] = get_all_products()

    if current_time - session['start'] > 1000:
        session['start'] = current_time
        session['cached_products'] = get_all_products()

    return session['cached_products']


def search_products_by_name(product_name_search):
    search_result = []
    try:
        products = get_all_products()
    except Exception as e:
        logger.warning('Не удалось получить список продуктов из БД: {}'.format(str(e)))
        raise Exception('Проблема с БД')
    for product in products:
        if product_name_search in product['title'].lower():
            search_result.append(product)
    return search_result
