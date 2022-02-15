from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.forms.custom_form_validators import validate_trimmed_length

class CommentForm(FlaskForm):
    content = StringField('content', validators=[DataRequired('Content is required'), validate_trimmed_length(min = 1, max = 2000)])
