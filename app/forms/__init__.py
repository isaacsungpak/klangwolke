from .login_form import LoginForm
from .signup_form import SignUpForm

from .create_song_form import CreateSongForm
from .edit_song_form import EditSongForm
from .delete_song_form import DeleteSongForm

from .create_playlist_form import CreatePlaylistForm


def validation_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{error}")
    return errorMessages
