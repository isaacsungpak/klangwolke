from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
from app.forms.custom_form_validators import validate_trimmed_length


def email_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message='Username is required'), username_exists, validate_trimmed_length(min = 1, max = 100)])
    email = StringField('email', validators=[DataRequired(message='Email is required'), email_exists])
    password = StringField('password', validators=[DataRequired(message='Password is required')])
