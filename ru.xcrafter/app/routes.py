from app import app
from app import db

from app.db_utils.products import get_all_products
from app.db_utils.products import get_product_by_id

from app.db_utils.users import sign_in
from app.db_utils.users import get_user_products

from app.models import Users

from flask import redirect
from flask import render_template
from flask import request
from flask import send_from_directory
from flask import url_for

from flask_login import current_user
from flask_login import login_user
from flask_login import login_required
from flask_login import logout_user

from werkzeug.security import generate_password_hash


@app.route('/')
def index() -> 'html':
    products = get_all_products()
    return render_template('index.html',
                           products=products,
                           meta_title='XCrafter - маркетплейс хендмейд товаров')


@app.route('/contacts')
def contacts():
    return render_template('contacts.html')


@app.route('/password-recovery')
def recoveryPassword():
    return render_template('recovery-password.html')


@app.route('/profile')
@login_required
def profile():
    return render_template('profile.html',
                           current_user=current_user)


@app.route('/profile/add-сard-item')
@login_required
def add_card_item():
    return render_template('add-card-item.html')


@app.route('/profile/edit-card-item/<id>')
@login_required
def profile_edit_card_item(id):
    product = get_product_by_id(id)
    return render_template('profile-edit-card-item.html',
                           product=product)


@app.route('/profile/product-catalog')
@login_required
def profile_product_catalog():
    id = current_user.id
    products = get_user_products(id)
    return render_template('profile-product-catalog.html',
                           products=products)


@app.route('/product/<product_id>')
def product(product_id):
    return render_template('product.html')


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


@app.route('/item/about-seller/<id>')
def card_item_about_seller(id):
    product = get_product_by_id(id)
    return render_template('card-item-about-seller.html',
                           product=product)


@app.route('/cart')
def cart():
    return render_template('cart.html')


@app.route('/api/1/user', methods=['POST'])
def user():
    data = request.form
    password_hash = generate_password_hash(data['password'])
    signin_user = Users(first_name=data['firstName'], surname=data['secondName'], email=data['email'],
                        phone_number=data['phone'], password_hash=password_hash)

    db.session.add(signin_user)
    db.session.commit()
    return redirect('/')


@app.route('/api/1/products')
@app.route('/jsons/document.json')
def products():
    return send_from_directory('static', 'jsons/document.json')


@app.route('/api/1/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        email = request.form["login"]
        password = request.form["password-sign"]
        # remember_me = request.form["remember"]
        # ищем пользователя по логину и паролю
        remember_me = True
        user = sign_in({"email": email, "password": password})
    if user['email'] == 'ok' and user['password'] == 'ok':
        # если пользователь с тамим логином и паролем существует -
        # авторизуем и делаем редирект
        user_test = Users.query.filter(Users.email == email).one()
        login_user(user_test, remember=remember_me)  # remember=remember_me
        return redirect("/profile")
    return redirect(url_for('index'))


@app.route('/api/1/logout')
def logout():
    logout_user()
    return redirect('/')
