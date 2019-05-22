from flask_wtf import FlaskForm

from wtforms import StringField 
from wtforms import PasswordField 
from wtforms import BooleanField
from wtforms import SubmitField 

from wtforms.validators import DataRequired
from wtforms.validators import Email


class LoginForm(FlaskForm):
    user_first_name = StringField('Имя', validators=[DataRequired()])
    user_surname = StringField('Фамилия', validators=[DataRequired()])
    user_email = StringField('E-mail', validators=[DataRequired()])
    user_phone_number = StringField('Телефон', validators=[DataRequired()])
    password = PasswordField('Пароль', validators=[DataRequired()])
    submit = SubmitField('Отправить')


class AddSubscriptionRequestForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Apply')

