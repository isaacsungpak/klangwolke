from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.forms import validate_trimmed_length

class EditSongForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), validate_trimmed_length(min = 1, max = 100)])
