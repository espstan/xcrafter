from flask import render_template, request, redirect, url_for, send_from_directory, abort
from werkzeug.security import generate_password_hash
from app import app, db
from app.models import Users, Products
from db.get_all_products import get_all_products


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


@app.route('/api/1/products')
@app.route('/jsons/document.json')
def products():
    return send_from_directory('static', 'jsons/document.json')
