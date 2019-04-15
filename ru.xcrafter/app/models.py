from app import db


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64), index=True)
    surname = db.Column(db.String(64), index=True)
    email = db.Column(db.String(120), index=True, unique=True)
    phone_number = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    products = db.relationship('Products', backref='seller', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.user_first_name)


class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True)
    description = db.Column(db.Text, index=True)
    price = db.Column(db.Integer, index=True)
    photo = db.Column(db.Text, index=True)
    seller = db.Column(db.Integer, db.ForeignKey('users.id'))
