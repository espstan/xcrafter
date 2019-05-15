from flask import Flask

from flask_assets import Environment
from flask_assets import Bundle

from config import Config

from flask_sqlalchemy import SQLAlchemy

from flask_migrate import Migrate

from flask_restful import Api

from flask_login import LoginManager

from flask_mail import Mail

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)
login = LoginManager(app)
login.login_view = 'index'
mail = Mail(app)

assets = Environment(app)
js = Bundle('script/toggle-sign-mode.js',
            'script/check-form.js',
            'script/modal-windows.js',
            'script/main-page.js',
            filters='jsmin', output='bundle.min.js')
assets.register('js_all', js)

assets_vendors = Environment(app)
js_vendors = Bundle('static/lib/bootstrap/4.3.1/js/bootstrap.min.js',
                    '/static/lib/jquery/3.4.0/jquery-3.4.0.min.js',
                    filters='jsmin', output='vendors.min.js')
assets_vendors.register('js_vendors', js_vendors)

assets_css = Environment(app)
css = Bundle('static/css/main-page.css',
             'static/css/main-page.css',
             '/static/css/cart.css',
             '/static/css/popup-window.css',
             '/static/css/profile.css',
             filters='cssmin', output='bundle.min.css')
assets_css.register('css_all', css)


from app import routes, models, server_api

