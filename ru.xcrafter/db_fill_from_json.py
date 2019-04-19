from app.models import Users, Products
from app import db
from werkzeug.security import generate_password_hash

import json

test_user_path = 'app/static/jsons/user.json'
test_products_path = 'app/static/jsons/document.json'

with open(test_user_path) as user_json:
    data = json.load(user_json)[0]
    # for user in data:
    pass_hash = generate_password_hash(data['password'])
    user = Users(first_name=data['name'], surname=data['surname'], email=data['email'], phone_number=data['phone'],
                 password_hash=pass_hash)
    db.session.add(user)
    db.session.commit()

with open(test_products_path) as prod_json:
    data = json.load(prod_json)
    for product in data:
        added_product = Products(title=product['title'], description=product['description'], price=product['price'],
                                 photo=product['photo'], seller_id=product['seller'])
        db.session.add(added_product)
        db.session.commit()
