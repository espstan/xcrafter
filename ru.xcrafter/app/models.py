from app import db
from sqlalchemy import JSON, ARRAY


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64), nullable=False)
    surname = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.String(64), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def __init__(self, first_name, surname, email, phone_number, password_hash, *args):
        self.first_name = first_name
        self.surname = surname
        self.email = email
        self.phone_number = phone_number
        self.password_hash = password_hash

    def __repr__(self):
        return '<User {}>'.format(self.user_first_name)


class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    # не знаю пока как хранить ссылки на фотографии(возможно массив)
    photo = db.Column(ARRAY(db.Text), nullable=False)
    seller_id = db.Column(db.Integer)

    def __init__(self, title, description, price, photo, seller_id, *args):
        self.title = title
        self.description = description
        self.price = price
        self.photo = photo
        self.seller_id = seller_id

    def __repr__(self):
        return '<Product {}>'.format(self.title)


class Orders(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, nullable=False)
    # купленные товары в формате json
    cart = db.Column(JSON, nullable=False)

    def __init__(self, customer_id, cart, *args):
        self.customer_id = customer_id
        self.cart = cart

    def __repr__(self):
        return '<Order № {}>'.format(self.id)
