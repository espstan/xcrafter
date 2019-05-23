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

app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024
app.config['ALLOWED_EXTENSIONS'] = ['png', 'jpg', 'jpeg']

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
            'script/count-view-product.js',
            'script/show-frequently-asked-question.js',
            filters='jsmin', output='bundle.min.js')
assets.register('js_all', js)

js_vendors = Bundle('lib/bootstrap/4.3.1/js/bootstrap.min.js',
                    'lib/jquery/3.4.0/jquery-3.4.0.min.js',
                    filters='jsmin', output='vendors.min.js')
assets.register('js_vendors', js_vendors)

css = Bundle('css/main-page.css',
             'css/signup-form.css',
             'css/cart.css',
             'css/popup-window.css',
             'css/profile.css',
             'css/advantage-marketplace.css',
             'css/frequently-asked-questions.css',
             filters='cssmin', output='bundle.min.css')
assets.register('css_all', css)


from xcrafter import routes
from xcrafter import models
from xcrafter import server_api
