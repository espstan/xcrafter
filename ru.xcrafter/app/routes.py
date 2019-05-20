from app import app
from app import db

from app.db_utils.products import get_all_products
from app.db_utils.products import get_product_by_id

from app.db_utils.users import activate
from app.db_utils.users import sign_in
from app.db_utils.users import get_user_products

from app.models import User

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

from loguru import logger

@app.route('/')
def index() -> 'html':
    try:
        products = get_all_products()
        return render_template('public/index.html',
                               products=products,
                               meta_title='XCrafter - маркетплейс хендмейд товаров')
    except Exception as e:
        logger.warning('Ошибка при обращении к БД товаров: {}'.format(e))


@app.route('/robots.txt')
def get_robots_txt():
    return send_from_directory('static', 'robots.txt')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('public/error404.html')


@app.errorhandler(500)
def page_not_found(e):
    return render_template('public/error500.html')


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


@app.route('/profile/add-сard-item')
@login_required
def add_card_item():
    return render_template('add-card-item.html')


@app.route('/profile/edit-card-item/<product_id>')
@login_required
def profile_edit_card_item(product_id):
    try:
        product = get_product_by_id(product_id)
        return render_template('profile/profile-edit-card-item.html',
                               product=product)
    except Exception as e:
        logger.warning('Ошибка при обращении к БД товаров: {}'.format(e))


@app.route('/profile/product-catalog')
@login_required
def profile_product_catalog():
    try:
        user_id = current_user.id
        products = get_user_products(user_id)
        return render_template('profile/profile-product-catalog.html',
                               products=products)
    except Exception as e:
        logger.warning('Ошибка при обращении к БД товаров и/или пользователей: {}'.format(e))


@app.route('/product/<product_id>')
def product(product_id):
    return render_template('public/product/product.html')


@app.route('/item/<product_id>')
def card_item(product_id):
    try:
        product = get_product_by_id(product_id)
        return render_template('public/product/card-item.html',
                               product=product)
    except Exception as e:
        logger.warning('Ошибка при обращении к БД товаров: {}'.format(e))


@app.route('/item/photo/<product_id>')
def card_item_photo(product_id):
    try:
        product = get_product_by_id(product_id)
        return render_template('public/product/card-item-photo.html',
                               product=product)
    except Exception as e:
        logger.warning('Ошибка при обращении к БД товаров: {}'.format(e))


@app.route('/item/<product_id>/description')  # TODO: Исправить порядок в URL
def card_item_description(product_id):
    try:
        product = get_product_by_id(product_id)
        return render_template('public/product/card-item-description.html',
                               product=product)
    except Exception as e:
        logger.warning('Ошибка при обращении к БД товаров: {}'.format(e))


@app.route('/item/about-seller/<product_id>')
def card_item_about_seller(product_id):
    try:
        product = get_product_by_id(product_id)
        return render_template('public/product/card-item-about-seller.html',
                               product=product)
    except Exception as e:
        logger.warning('Ошибка при обращении к БД товаров: {}'.format(e))


@app.route('/cart')
def cart():
    return render_template('public/cart.html')


@app.route('/search')
def search():
    return render_template('search.html')


@app.route('/subscription-mail-success')
def subscription_mail_success():
    return render_template('public/mail-list/subscription-mail-success.html')


@app.route('/subscription-mail-error')
def subscription_mail_error():
    return render_template('public/mail-list/subscription-mail-error.html')


# Роуты для api

@app.route('/api/1/user', methods=['POST'])
def user():
    try:
        data = request.form
        password_hash = generate_password_hash(data['password'])
        signin_user = User(first_name=data['firstName'], surname=data['secondName'], email=data['email'],
                            phone_number=data['phone'], password_hash=password_hash)

        db.session.add(signin_user)
        db.session.commit()
        return redirect(url_for('index'))
    except Exception as e:
        logger.warning('Ошибка при обращении к БД товаров: {}'.format(e))
        return redirect(url_for('index'))


@app.route('/api/1/products')
@app.route('/jsons/document.json')
def products():
    return send_from_directory('static', 'jsons/document.json')


@app.route('/api/1/login', methods=['POST'])
def login():
    try:
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
                        user_for_login = User.query.filter(User.email == email).first()
                        login_user(user_for_login, remember=remember_me)
                        return redirect(url_for('profile'))
        # при неудачной попытке - пока перенаправляем на главную
        return redirect(url_for('index'))
    except Exception as e:
        logger.warning('Ошибка при обращении к БД товаров: {}'.format(e))
        return redirect(url_for('index'))


@app.route('/api/1/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/api/v1/activate-user-account/<string:activate_key>')
@login_required
def activate_account(activate_key):
    try:
        activate(activate_key)
        return redirect(url_for('index'))
    except Exception as e:
        logger.warning('Ошибка при обращении к БД пользвателей: {}'.format(e))


