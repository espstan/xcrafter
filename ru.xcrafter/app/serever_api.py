from app import api
from app.db_utils.products import get_product_by_id
from flask_restful import Resource
import json


class getProductInfoById(Resource):
    def get(self, id):
        product_info = get_product_by_id(id)
        return json.dumps(product_info)


api.add_resource(getProductInfoById, '/getProductById/<int:id>')
