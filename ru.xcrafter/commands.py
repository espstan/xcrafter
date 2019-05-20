from os.path import join

import click

import json

from app import app
from app import db

from werkzeug.security import generate_password_hash

from sqlalchemy.exc import SQLAlchemyError

from app.models import Users
from app.models import Products


@click.command()
@click.option('--demo', help='Загрузка демо-данных в БД')
def load(demo):
    """Загрузка демо-товаров и демо-пользователя в БД"""
    test_products_data_path = join(app.root_path, 'static', 'jsons', 'document.json')
    with open(test_products_data_path) as prod_json:
        data = json.load(prod_json)
        for prod in data:
            product = Products(title=prod['title'],
                               description=prod['description'],
                               price=prod['price'],
                               photo=prod['photo'],
                               seller_id=prod['seller'])
            try:
                db.session.add(product)
                db.session.commit()
            except SQLAlchemyError as e:
                error = str(e.__class__.__name__)
                click.echo("SQLAlchemy error: " + error)

    """Загрузка демо-пользователя в БД"""
    test_user_data_path = join(app.root_path, 'static', 'jsons', 'user.json')
    with open(test_user_data_path) as user_json:
        data = json.load(user_json)[0]
    pass_hash = generate_password_hash(data['password'])
    user = Users(first_name=data['name'],
                 surname=data['surname'],
                 email=data['email'],
                 phone_number=data['phone'],
                 password_hash=pass_hash,
                 agree_to_processing_personal_data=True,
                 active=data['active'])
    try:
        db.session.add(user)
        db.session.commit()
    except SQLAlchemyError as e:
        error = str(e.__class__.__name__)
        click.echo("SQLAlchemy error: " + error)


if __name__ == '__main__':
    load()
