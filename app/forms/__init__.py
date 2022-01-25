from .login_form import LoginForm
from .signup_form import SignUpForm

from .create_song_form import CreateSongForm
from .edit_song_form import EditSongForm
from .delete_song_form import DeleteSongForm

from .create_playlist_form import CreatePlaylistForm

import re
from wtforms.validators import ValidationError

def validation_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{error}")
    return errorMessages

def validate_trimmed_length(min = 1, max = 100):
    message = f'Title must consist of {min}-{max} non-space characters.'
    def _length(form, field):
        string = field.data
        trimmed_string = re.sub(' |​', '', string)
        if len(trimmed_string) > {max} or len(trimmed_string) < {min}:
            raise ValidationError(message)
    return _length
