from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.forms.custom_form_validators import validate_trimmed_length

ALLOWED_AUDIO_EXTENSIONS = ["opus", "wav", "ogg", "mp3", "oga"]
ALLOWED_IMAGE_EXTENSIONS = ["pjp", "pjpeg", "jfif", "png", "jpg", "jpeg", "gif"]

class CreateSongForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), validate_trimmed_length(min = 1, max = 100)])
    audio = FileField('audio', validators=[FileRequired(), FileAllowed(ALLOWED_AUDIO_EXTENSIONS, 'Unrecognized audio format.')])
    image = FileField('image', validators=[FileRequired(), FileAllowed(ALLOWED_IMAGE_EXTENSIONS, 'Unrecognized image format.')])
