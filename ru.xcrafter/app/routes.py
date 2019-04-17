from flask import render_template, request, redirect, url_for, send_from_directory, abort
from werkzeug.security import generate_password_hash
from app import app, db
from app.models import Users, Products


@app.route('/')
@app.route('/index')
def index() -> 'html':
    return render_template('Index.html')


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
def products():
    return send_from_directory('static', 'jsons/document.json')
