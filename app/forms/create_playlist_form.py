from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def length_validator(form, field):
    message = f'Title must be between 1 and 255 characters long.'
    if len(field.data) > 255 or len(field.data) < 1:
        raise ValidationError(message)

class CreatePlaylistForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), length_validator])
    song_id = IntegerField('songId', validators=[DataRequired()])
