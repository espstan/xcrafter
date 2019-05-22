from app import db

from sqlalchemy.exc import InvalidRequestError

from sqlalchemy.orm.exc import NoResultFound

from app.models import Subscription


def get_subscription(email):
    try:
        subscription = Subscription.query.filter(Subscription.email == email).one()
    except NoResultFound:
        return None
    return subscription


def add_subscription(email):
    try:
        subscription = Subscription(email)
        db.session.add(subscription)
        db.session.commit()
    except SQLAlchemyError as e:
        error = str(e.__class__.__name__)
        print("SQLAlchemy error: " + error)
