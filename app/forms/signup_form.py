from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
import re


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

def valid_username_length(form, field):
    username = field.data
    trimmed_username = re.sub(' |​', '', username)
    if len(trimmed_username) > 40 or len(trimmed_username) < 1:
        raise ValidationError('Username must consist of 1-40 non-space characters.')

class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message='Username is required'), username_exists, valid_username_length])
    email = StringField('email', validators=[DataRequired(message='Email is required'), email_exists])
    password = StringField('password', validators=[DataRequired(message='Password is required')])
