from app import app
from app import db

from app.db_utils.products import get_all_products
from app.db_utils.products import get_product_by_id

from app.db_utils.users import activate
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
    return render_template('public/index.html',
                           products=products,
                           meta_title='XCrafter - маркетплейс хендмейд товаров')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('public/error404.html')


@app.route('/contacts')
def contacts():
    return render_template('public/contacts.html')


@app.route('/password-recovery')
def recoveryPassword():
    return render_template('public/recovery-password.html')


@app.route('/profile')
@login_required
def profile():
    return render_template('profile/profile.html',
                           current_user=current_user)


@app.route('/api/v1/activate-user-account/<string:activate_key>')
@login_required
def activate_account(activate_key):
    activate(activate_key)
    return redirect(url_for('index'))


@app.route('/profile/add-сard-item')
@login_required
def add_card_item():
    return render_template('add-card-item.html')


@app.route('/profile/edit-card-item/<product_id>')
@login_required
def profile_edit_card_item(product_id):
    product = get_product_by_id(product_id)
    return render_template('profile/profile-edit-card-item.html',
                           product=product)


@app.route('/profile/product-catalog')
@login_required
def profile_product_catalog():
    user_id = current_user.id
    products = get_user_products(user_id)
    return render_template('profile/profile-product-catalog.html',
                           products=products)


@app.route('/product/<product_id>')
def product(product_id):
    return render_template('product.html')


@app.route('/item/<product_id>')
def card_item(product_id):
    product = get_product_by_id(product_id)
    return render_template('card-item.html',
                           product=product)


@app.route('/item/photo/<product_id>')
def card_item_photo(product_id):
    product = get_product_by_id(product_id)
    return render_template('card-item-photo.html',
                           product=product)


@app.route('/item/<product_id>/description')  # TODO: Исправить порядок в URL
def card_item_description(product_id):
    product = get_product_by_id(product_id)
    return render_template('card-item-description.html',
                           product=product)


@app.route('/item/about-seller/<product_id>')
def card_item_about_seller(product_id):
    product = get_product_by_id(product_id)
    return render_template('card-item-about-seller.html',
                           product=product)


@app.route('/cart')
def cart():
    return render_template('public/cart.html')


@app.route('/api/1/user', methods=['POST'])
def user():
    data = request.form
    password_hash = generate_password_hash(data['password'])
    signin_user = Users(first_name=data['firstName'], surname=data['secondName'], email=data['email'],
                        phone_number=data['phone'], password_hash=password_hash)

    db.session.add(signin_user)
    db.session.commit()
    return redirect(url_for('index'))


@app.route('/api/1/products')
@app.route('/jsons/document.json')
def products():
    return send_from_directory('static', 'jsons/document.json')


@app.route('/api/1/login', methods=['POST'])
def login():
    if request.method == "POST":
        if "login" in request.form:
            if "password-sign" in request.form:
                email = request.form["login"]
                password = request.form["password-sign"]
                # remember_me = request.form["remember"]
                remember_me = True  # TODO: временное решение - пока в форме нет флага "Запомнить меня"

                # проверяем правильность сочетания email/password
                check_result = sign_in({"email": email, "password": password})
                if check_result['password'] == 'ok':
                    # если проверка соответствия email/password прошла успешно -
                    # авторизуем и делаем редирект
                    user_for_login = Users.query.filter(Users.email == email).first()
                    login_user(user_for_login, remember=remember_me)
                    return redirect(url_for('profile'))
    # при неудачной попытке - пока перенаправляем на главную
    return redirect(url_for('index'))


@app.route('/api/1/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/search')
def search():
    return render_template('search.html')
