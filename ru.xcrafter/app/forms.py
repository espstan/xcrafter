from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired


class LoginForm(FlaskForm):
    user_first_name = StringField('Имя', validators=[DataRequired()])
    user_surname = StringField('Фамилия', validators=[DataRequired()])
    user_email = StringField('E-mail', validators=[DataRequired()])
    user_phone_number = StringField('Телефон', validators=[DataRequired()])
    password = PasswordField('Пароль', validators=[DataRequired()])
    submit = SubmitField('Отправить')
