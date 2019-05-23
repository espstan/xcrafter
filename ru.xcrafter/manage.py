from flask_script import Manager

from flask_migrate import Migrate
from flask_migrate import MigrateCommand

from xcrafter import app
from xcrafter import db

from xcrafter.models import User
from xcrafter.models import Product
from xcrafter.models import Order
from xcrafter.models import Address
from xcrafter.models import Photo
from xcrafter.models import Subscription


migrate = Migrate(app, db)

manager = Manager(app)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()

