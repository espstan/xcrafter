from app import api
from app.db_utils.products import get_product_by_id, add_product, delete_product_by_id, edit_product
from flask_restful import Resource, reqparse
import json
from flask_login import login_required


class getProductInfoById(Resource):
    def get(self, id):
        product_info = get_product_by_id(id)
        return json.dumps(product_info)


class addItemInCatalog(Resource):
    @login_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title')
        parser.add_argument('description')
        parser.add_argument('price')
        parser.add_argument('photo')
        parser.add_argument('seller_id')
        args = parser.parse_args()
        result = add_product(args)
        return result


class deleteItemInDB(Resource):
    @login_required
    def delete(self, id):
        delete_product_by_id(id)


class editCardItem(Resource):
    @login_required
    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id')
        parser.add_argument('title')
        parser.add_argument('description')
        parser.add_argument('price')
        parser.add_argument('photo')
        args = parser.parse_args()
        result = edit_product(args)
        return result

api.add_resource(getProductInfoById, '/getProductById/<int:id>')
api.add_resource(addItemInCatalog, '/api/addCardItemInCatalog')
api.add_resource(deleteItemInDB, '/api/deleteItem/<int:id>')
api.add_resource(editCardItem, '/api/editCardItem')
