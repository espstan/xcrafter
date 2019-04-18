from app.models import Products


def get_all_products():
    products_from_db = Products.query.all()
    products = []

    for product in products_from_db:
        products_for_add = {'id': product.id, 'title': product.title, 'description': product.description,
                            'price': product.price, 'photo': product.photo[0], 'seller_id': product.seller_id}
        products.append(products_for_add)

    return products

