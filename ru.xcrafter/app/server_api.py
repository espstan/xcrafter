import json

from app import api

from flask import redirect
from flask import url_for
from flask import abort
from flask import jsonify
from flask import Response
from flask import request

from flask_login import login_required

from flask_restful import Resource
from flask_restful import reqparse

from app.db_utils.products import get_product_by_id
from app.db_utils.products import get_product
from app.db_utils.products import add_product
from app.db_utils.products import delete_product_by_id
from app.db_utils.products import edit_product
from app.db_utils.products import get_all_products

from app.db_utils.users import sign_up
from app.db_utils.users import get_user_by_id
from app.db_utils.users import send_mail

from app.db_utils.subscriptions import get_subscription
from app.db_utils.subscriptions import add_subscription

from app.models import Product
from app.models import Subscription


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


class GetAllProducts(Resource):
    def get(self):
        try:
            products = get_all_products()
            result = {'products': products, 'total': len(products), 'success': 'true'}
        except:
            result = {'success': 'false'}

        return json.dumps(result)


class SetViewCount(Resource):
    def get(self, product_id):
        product = get_product(product_id)
        product.change_view_count()
        return product.view_count


class AddSubscription(Resource):
    def get(self):
        email = request.args.get('q')
        if email:
            subscription = get_subscription(email)
            if subscription is None:
                add_subscription(email)
            else:
                if not subscription.is_active:
                    subscription.set_active()
        return redirect(url_for('index'))


api.add_resource(Registration, '/api/registration') #TODO добавить версию api
api.add_resource(GetProductInfoById, '/get-product-by-id/<int:id>')
api.add_resource(AddItemInCatalog, '/api/add-card-item-in-catalog')
api.add_resource(DeleteItemInDB, '/api/delete-item/<int:id>')
api.add_resource(EditCardItem, '/api/edit-card-item')
api.add_resource(GetAllProducts, '/api/v1/products/all')
api.add_resource(SetViewCount, '/api/<int:product_id>/product_view')
api.add_resource(AddSubscription, '/api/v1/subscribe')
