import datetime
import uuid
import jwt

from time import time

from xcrafter import db
from xcrafter import login

from sqlalchemy import JSON
from sqlalchemy import DateTime
from sqlalchemy import Date

from sqlalchemy.exc import SQLAlchemyError

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

from flask_login import UserMixin

from loguru import logger

from config import Config


class User(UserMixin, db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64), nullable=False)
    surname = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.String(64), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_time = db.Column(DateTime(timezone=False), nullable=False)
    last_changed_time = db.Column(DateTime(timezone=False), nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    agree_to_processing_personal_data = db.Column(db.Boolean, nullable=False)
    gender = db.Column(db.String(32))
    activate_key = db.Column(db.String(128), nullable=False)
    birthday = db.Column(Date)
    store_name = db.Column(db.Text)
    store_alias = db.Column(db.Text)

    def __init__(self, first_name, surname, email, phone_number,
                 password_hash, agree_to_processing_personal_data, active=False, *args):
        self.first_name = first_name
        self.surname = surname
        self.email = email
        self.phone_number = phone_number
        self.password_hash = password_hash
        self.created_time = datetime.datetime.today()
        self.last_changed_time = self.created_time
        self.active = active
        self.agree_to_processing_personal_data = agree_to_processing_personal_data
        self.activate_key = generate_password_hash(str(uuid.uuid4()))[20:]

    def is_active(self):
        return self.active

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_reset_password_token(self, expires_in=300):
        return jwt.encode(
            {'reset_password': self.id, 'exp': time() + expires_in},
            Config.SECRET_KEY, algorithm='HS256').decode('utf-8')

    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, Config.SECRET_KEY,
                            algorithms=['HS256'])['reset_password']
        except Exception as e:
            raise Exception(str(e))
        return User.query.get(id)

    def __repr__(self):
        return '<User {}>'.format(self.first_name)


@login.user_loader
def load_user(user_id):
    try:
        return User.query.filter(User.id == int(user_id)).first()
    except Exception as e:
        logger.warning('Ошибка при обращении к БД пользователей: {}'.format(e))
        raise Exception(str(e))


class Product(db.Model):

    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    photo = db.Column(db.Text, nullable=False)
    seller_id = db.Column(db.Integer)
    created_time = db.Column(DateTime(timezone=True), nullable=False)
    last_changed_time = db.Column(DateTime(timezone=True), nullable=False)
    alias = db.Column(db.Text)
    available = db.Column(db.Boolean, nullable=False)
    view_count = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(64))

    def __init__(self, title, description, price, photo, seller_id, *args):
        self.title = title
        self.description = description
        self.price = price
        self.photo = photo
        self.seller_id = seller_id
        self.created_time = datetime.datetime.now()
        self.last_changed_time = self.created_time
        self.available = True
        self.view_count = 0

    def __repr__(self):
        return '<Product {}>'.format(self.title)

    def change_view_count(self):
        try:
            self.view_count += 1
            db.session.commit()
        except SQLAlchemyError as e:
            error = str(e.__class__.__name__)
            print("SQLAlchemy error: " + error)
        return self.view_count

    def get_info(self):
        product = {}
        product['id'] = self.id
        product['title'] = self.title
        product['description'] = self.description
        product['price'] = self.price
        product['photo'] = self.photo
        product['seller_id'] = self.seller_id
        return product


class Order(db.Model):

    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, nullable=False)
    # купленные товары в формате json
    cart = db.Column(JSON, nullable=False)
    created_time = db.Column(DateTime(timezone=True), nullable=False)
    address_id = db.Column(db.Integer, nullable=False)

    def __init__(self, customer_id, cart, *args):
        self.customer_id = customer_id
        self.cart = cart
        self.created_time = datetime.datetime.today()

    def __repr__(self):
        return '<Order ID {}>'.format(self.id)


class Address(db.Model):

    __tablename__ = 'address'

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer)
    created_time = db.Column(DateTime(timezone=False), nullable=False)
    last_changed_time = db.Column(DateTime(timezone=False), nullable=False)
    city = db.Column(db.Text, nullable=False)
    street = db.Column(db.Text, nullable=False)
    house_number = db.Column(db.Integer, nullable=False)
    house_additional_number = db.Column(db.Text)
    entrance_number = db.Column(db.Integer, nullable=False)
    apartment = db.Column(db.Integer)

    def __init__(self, customer_id, city, street, house_number, entrance_number,
                 house_additional_number=None, apartment=None):
        self.customer_id = customer_id
        self.city = city
        self.street = street
        self.house_number = house_number
        self.entrance_number = entrance_number
        self.house_additional_number = house_additional_number
        self.apartment = apartment
        self.created_time = datetime.datetime.today()
        self.last_changed_time = self.created_time


class Photo(db.Model):

    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    path = db.Column(db.Text, nullable=False)
    created_time = db.Column(DateTime(timezone=True), nullable=False)
    file_size = db.Column(db.Integer)

    def __init__(self, product_id, user_id, path):
        self.product_id = product_id
        self.user_id = user_id
        self.path = path
        self.created_time = datetime.datetime.today()


class Subscription(db.Model):
    __tablename__ = 'subcription'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text, unique=True, nullable=False)
    is_active = db.Column(db.Boolean, nullable=False)

    def __init__(self, email):
        self.email = email
        self.is_active = True

    def set_active(self):
        try:
            self.is_active = True
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            error = str(e.__class__.__name__)
            print("SQLAlchemy error: " + error)
            return False
