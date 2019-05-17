from flask_script import Manager

from flask_migrate import Migrate, MigrateCommand

from app import app
from app import db

from app.models import User
from app.models import Product
from app.models import Order
from app.models import Adress
from app.models import Photo

migrate = Migrate(app, db)

manager = Manager(app)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()

