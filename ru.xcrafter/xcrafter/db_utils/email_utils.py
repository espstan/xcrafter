from xcrafter import app
from xcrafter import mail

from flask_mail import Message


def send_mail(message_theme, message_html, email):
    try:
        msg = Message(message_theme,
                      sender="juniorlabtest@gmail.com",
                      recipients=[email])
        msg.title = message_theme
        msg.html = message_html
        print(msg.title)
        print(email)

        with app.app_context():
            mail.send(msg)
        print("Mail sent, success!")
    except Exception as e:
        return str(e)
