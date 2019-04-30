from app import api
from app.db_utils.products import get_product_by_id, add_product, delete_product_by_id, edit_product
from app.db_utils.users import sign_up, get_user_by_id, send_mail, activate
from flask_restful import Resource, reqparse
import json
from flask_login import login_required
from flask import redirect, url_for, abort, jsonify, Response


class GetProductInfoById(Resource):
    def get(self, id):
        product_info = get_product_by_id(id)
        return json.dumps(product_info)


class AddItemInCatalog(Resource):
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


class DeleteItemInDB(Resource):
    @login_required
    def delete(self, id):
        delete_product_by_id(id)


class EditCardItem(Resource):
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


class Registration(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name')
        parser.add_argument('surname')
        parser.add_argument('email')
        parser.add_argument('phone')
        parser.add_argument('password')
        parser.add_argument('agreement')
        args = parser.parse_args()
        if args['agreement'] == "True":
            args['agreement'] = True

        sign_up_result = sign_up(args)

        if sign_up_result is not None:
            user = get_user_by_id(sign_up_result)
            if user is not None:
                send_mail(user.email, user.activate_key)
                return Response(status=201)

        return abort(403)


class ActivateUserAccount(Resource):
    def get(self, activate_key: str):
        activate(activate_key)
        return redirect(url_for('index'))


api.add_resource(Registration, '/api/registration')
api.add_resource(GetProductInfoById, '/getProductById/<int:id>')
api.add_resource(AddItemInCatalog, '/api/addCardItemInCatalog')
api.add_resource(DeleteItemInDB, '/api/deleteItem/<int:id>')
api.add_resource(EditCardItem, '/api/editCardItem')
api.add_resource(ActivateUserAccount, '/api/v1/activate_user_account/<string:activate_key>')
