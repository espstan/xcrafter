from flask_mail import Message

from xcrafter import mail


def send_mail(message_theme, message_body, sender,  *recipients):
    try:
        msg = Message(message_theme, sender, recipients)
        msg.body = message_body
        mail.send(msg)
        return "Mail sent, success!"
    except Exception as e:
        return str(e)