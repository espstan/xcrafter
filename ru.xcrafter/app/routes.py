from flask import render_template, request, send_from_directory
from app import app
import json


@app.route('/')
@app.route('/index')
def index() -> 'html':
    return render_template('Index.html')


@app.route('/api/1/user', methods=['GET', 'POST'])
def user():
    data = request.get_json(silent=True)
    print(data)
    return json.dumps(data)


@app.route('/api/1/products')
@app.route('/jsons/document.json')
def products():
    return send_from_directory('static', 'jsons/document.json')
