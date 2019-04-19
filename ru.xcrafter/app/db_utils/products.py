from sqlalchemy.orm.exc import NoResultFound

from app.models import Products


def get_all_products() -> []:
    """Возвращает массив словарей(товаров)"""

    data = Products.query.all()
    products = []

    for product in data:
        products_for_add = {'id': product.id, 'title': product.title, 'description': product.description,
                            'price': product.price, 'photo': product.photo[0], 'seller_id': product.seller_id}
        products.append(products_for_add)

    return products


def get_product_by_id(product_id: int) -> {}:
    """Возвращает словарь с информацией о товаре с определённым id.
    При запросе по не существующему id - возвращает пустой словарь."""

    try:
        data = Products.query.filter(Products.id == product_id).one()
        product = {'id': data.id, 'title': data.title, 'description': data.description,
                   'price': data.price, 'photo': data.photo, 'seller_id': data.seller_id}
    except NoResultFound:
        product = {}

    return product

