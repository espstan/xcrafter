from xcrafter import db

from sqlalchemy.exc import SQLAlchemyError

from xcrafter.models import UserQuestion

from sqlalchemy.orm.exc import NoResultFound


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


def get_userquestion_id():
    try:
        questions_id = UserQuestion.query.all()
        return [sorted(question_id for question_id in questions_id.user_id)][-1] + 1
    except NoResultFound:
        return 1
