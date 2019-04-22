from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.exc import OperationalError

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
