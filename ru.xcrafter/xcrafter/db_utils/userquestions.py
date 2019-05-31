from xcrafter import db

from sqlalchemy.exc import SQLAlchemyError

from xcrafter.models import UserQuestion


def add_userquestion(theme, body, email, user_id):
    try:
        question = UserQuestion(theme, body, email, user_id)
        db.session.add(question)
        db.session.commit()
        return question
    except SQLAlchemyError as e:
        error = str(e.__class__.__name__)
        print("SQLAlchemy error: " + error)
        return None

