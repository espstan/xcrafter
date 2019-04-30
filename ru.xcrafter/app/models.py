from app import db, login
from sqlalchemy import JSON, DateTime, Date
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
from flask_login import UserMixin


class Users(UserMixin, db.Model):
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

    # store tests

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

    def __repr__(self):
        return '<User {}>'.format(self.first_name)


@login.user_loader
def load_user(id):
    return Users.query.filter(Users.id == int(id)).first()


class Products(db.Model):
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
        self.created_time = datetime.datetime.today()
        self.last_changed_time = self.created_time
        self.available = True
        self.view_count = 0

    def __repr__(self):
        return '<Product {}>'.format(self.title)


class Orders(db.Model):
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
        return '<Order № {}>'.format(self.id)


class Address(db.Model):
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
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, nullable=False)
    owner_id = db.Column(db.Integer, nullable=False)
    path = db.Column(db.Text, nullable=False)
    created_time = db.Column(DateTime(timezone=True), nullable=False)
    file_size = db.Column(db.Integer)

    def __init__(self, product_id, owner_id, path):
        self.product_id = product_id
        self.owner_id = owner_id
        self.path = path
        self.created_time = datetime.datetime.today()
