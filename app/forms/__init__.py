from .login_form import LoginForm
from .signup_form import SignUpForm

from .create_song_form import CreateSongForm
from .edit_song_form import EditSongForm

from .create_playlist_form import CreatePlaylistForm
from .edit_playlist_form import EditPlaylistForm

from .fieldless_form import FieldlessForm

from .comment_form import CommentForm

def validation_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{error}")
    return errorMessages
