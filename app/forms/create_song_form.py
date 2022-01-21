from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

ALLOWED_AUDIO_EXTENSIONS = ["wav", "m4a", "mp3"]
ALLOWED_IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif"]

class NewSongForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    audio = FileField('audio', validators=[FileRequired(), FileAllowed(ALLOWED_AUDIO_EXTENSIONS, 'Allowed formats: .wav, .m4a, .mp3')])
    image = FileField('image', validators=[FileRequired(), FileAllowed(ALLOWED_IMAGE_EXTENSIONS, 'Allowed formats: .png, .jpg, .jpeg, .gif')])
