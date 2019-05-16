from app.models import Users
from app.models import Products
from app import db

from werkzeug.security import generate_password_hash

import json


def load_data():
    test_user_path = 'app/static/jsons/user.json'
    test_products_path = 'app/static/jsons/document.json'

    with open(test_user_path) as user_json:
        data = json.load(user_json)[0]
        pass_hash = generate_password_hash(data['password'])
        user = Users(first_name=data['name'], surname=data['surname'], email=data['email'], phone_number=data['phone'],
                     password_hash=pass_hash, agree_to_processing_personal_data=True, active=data['active'])
        db.session.add(user)
        db.session.commit()

    with open(test_products_path) as prod_json:
        data = json.load(prod_json)
        for prod in data:
            product = Products(title=prod['title'], description=prod['description'], price=prod['price'],
                               photo=prod['photo'], seller_id=prod['seller'])
            db.session.add(product)
            db.session.commit()
