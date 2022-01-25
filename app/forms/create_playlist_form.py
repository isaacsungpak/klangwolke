from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
import re

def length_validator(form, field):
    message = f'Title must consist of 1-100 non-space characters.'
    title = field.data
    trimmed_title = re.sub(' |​', '', title)
    if len(trimmed_title) > 40 or len(trimmed_title) < 1:
        raise ValidationError('Title must consist of 1-40 non-space characters.')

class CreatePlaylistForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Title is required'), length_validator])
    song_id = IntegerField('songId', validators=[DataRequired()])
