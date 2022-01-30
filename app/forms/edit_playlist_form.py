from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.forms.custom_form_validators import validate_trimmed_length

class EditPlaylistForm(FlaskForm):
    title = StringField('title', validators=[DataRequired('Title is required'), validate_trimmed_length(min = 1, max = 100)])
