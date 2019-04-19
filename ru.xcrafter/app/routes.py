from flask import render_template, request, redirect, send_from_directory
from werkzeug.security import generate_password_hash
from app import app, db
from app.models import Users
from app.db_utils.products import get_all_products, get_product_by_id


@app.route('/')
@app.route('/index')
def index() -> 'html':
    products = get_all_products()
    return render_template('Index.html',
                           products=products)


@app.route('/api/1/user', methods=['POST'])
def user():
    data = request.form
    password_hash = generate_password_hash(data['password'])
    signin_user = Users(first_name=data['firstName'], surname=data['secondName'], email=data['email'],
                        phone_number=data['phone'], password_hash=password_hash)

    db.session.add(signin_user)
    db.session.commit()
    return redirect('/')


@app.route('/item/<id>')
def card_item(id):
    product = get_product_by_id(id)
    return render_template('card-item.html',
                           product=product)


@app.route('/item/photo/<id>')
def card_item_photo(id):
    product = get_product_by_id(id)
    return render_template('card-item-photo.html',
                           product=product)


@app.route('/item/description/<id>')
@app.route('/item/<id>/description')
def card_item_description(id):
    product = get_product_by_id(id)
    return render_template('card-item-description.html',
                           product=product)


@app.route('/item/aboutSeller/<id>')
def card_item_about_seller(id):
    product = get_product_by_id(id)
    return render_template('card-item-about-seller.html',
                           product=product)


@app.route('/cart')
def cart():
    return render_template('cart.html')


@app.route('/api/1/products')
@app.route('/jsons/document.json')
def products():
    return send_from_directory('static', 'jsons/document.json')
