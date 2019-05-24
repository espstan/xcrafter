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

js_vendors = Bundle('lib/jquery/3.4.0/jquery-3.4.0.min.js',
                    'lib/bootstrap/4.3.1/js/bootstrap.min.js',       
                    'lib/pace/1.0.2/js/pace.min.js',
                    'lib/fancybox/3.5.7/js/jquery.fancybox.min.js',
                    filters='jsmin', output='vendors.min.js')
assets.register('js_vendors', js_vendors)

css = Bundle('css/main-page.css',
             'css/signup-form.css',
             'css/cart.css',
             'css/popup-window.css',
             'css/profile.css',
             'css/advantage-marketplace.css',
             'css/frequently-asked-questions.css',
             'css/card-item.css',
             filters='cssmin', output='bundle.min.css')
assets.register('css_all', css)

css_vendors = Bundle('lib/pace/1.0.2/css/pace-theme-minimal.css',
                     'lib/fancybox/3.5.7/css/jquery.fancybox.min.css',
                     'lib/bootstrap/4.3.1/css/bootstrap.min.css')
assets.register('css_vendors', css_vendors)


from xcrafter import routes
from xcrafter import models
from xcrafter import server_api
