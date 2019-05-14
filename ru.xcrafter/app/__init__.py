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
js = Bundle('script/toggle-sign-mode.js', 'script/check-form.js', 'script/modal-windows.js', 'script/main-page.js',
            filters='jsmin', output='bundle.min.js')
assets.register('js_all', js)

from app import routes, models, server_api
