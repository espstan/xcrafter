from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.exc import OperationalError
from flask_login import current_user
from app.models import Products
from app import db


def get_all_products() -> []:
    """Возвращает массив словарей(товаров)"""

    data = Products.query.all()
    products = []

    for product in data:
        products_for_add = {'id': product.id, 'title': product.title, 'description': product.description,
                            'price': product.price, 'photo': product.photo, 'seller_id': product.seller_id}
        products.append(products_for_add)

    return products


def get_product_by_id(product_id: int) -> {}:
    """Возвращает словарь с информацией о товаре с определённым id.
    При запросе по не существующему id - возвращает пустой словарь."""

    try:
        data = Products.query.filter(Products.id == product_id).one()
        product = {'id': data.id, 'title': data.title, 'description': data.description,
                   'price': data.price, 'photo': [data.photo], 'seller_id': data.seller_id}
    except NoResultFound:
        product = {}

    return product


def add_product(product: {}) -> str:
    """Записывает новый товар в бд(в таблицу товаров).
    Принимает словарь {'title': '', 'description': '', 'price': '', 'photo': '', 'seller_id': ''}.
    Возвращает строку ok/err -  добавилось/база не доступна"""

    product_for_add = Products(product['title'], product['description'], product['price'], product['photo'],
                               product['seller_id'])

    db.session.add(product_for_add)

    try:
        db.session.commit()
    except OperationalError:
        db.session.rollback()
        return 'err'

    return 'ok'


def delete_product_by_id(product_id: int):
    """Удаляет продукт из базы. Принимает id товара."""

    try:
        product_for_delete = Products.query.filter(Products.id == product_id).one()
    except NoResultFound:
        # Пока не знаю как обработать
        return

    # Кажется тут должна быть проверка(действительно ли данный товар принадлежит current_user'у) перед удалением
    if product_for_delete.seller_id == current_user.id:

        db.session.delete(product_for_delete)
        db.session.commit()


def edit_product(item: {}):
    """Редактирует поля товара.
     Принимает словарь {'id': '', 'title': '', 'description': '', 'price': '', 'photo': ''}.
     (не обязательно все ключи)"""

    try:
        edited_item = Products.query.filter(Products.id == item['id']).one()

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
