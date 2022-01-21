from flask import Blueprint, request, abort
from flask_login import login_required, current_user
from app.models import db, Song
from app.forms import CreateSongForm, EditSongForm, DeleteSongForm, validation_error_messages
from app.s3_helpers import get_unique_filename, upload_file_to_s3, delete_file_from_s3

song_routes = Blueprint('songs', __name__)

# get all songs
@song_routes.route('/')
def get_songs():
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}

# get specific song by id
@song_routes.route('/<int:id>')
def get_song(id):
    song = Song.query.get(id)

    if not song:
        return abort(404)

    return song.to_dict()

# get songs by search key
@song_routes.route('/', methods=['POST'])
@login_required
def create_song():
    form = CreateSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        provided_audio = form.audio
        provided_audio.filename = get_unique_filename(provided_audio.filename)
        audio_s3_upload = upload_file_to_s3(provided_audio)
        if "url" not in audio_s3_upload: return audio_s3_upload, 400

        provided_image = form.image
        provided_image.filename = get_unique_filename(provided_image.filename)
        image_s3_upload = upload_file_to_s3(provided_image)
        if "url" not in image_s3_upload: return image_s3_upload, 400

        new_song = Song(
            user_id=current_user.id,
            title=form.title,
            audio=audio_s3_upload["url"],
            image=image_s3_upload["url"],
            s3_audio_filename=provided_audio.filename,
            s3_image_filename=provided_image.filename,
        )

        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict()

    return validation_error_messages(form.errors), 400

@song_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_song(id):
    form = EditSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    new_data = request.json
    form.title = new_data.title

    if form.validate_on_submit():
        song = Song.query.get(id)

        if not song: return abort(404)
        elif song.user_id != current_user.id: return abort(403)

        song.title = form.title
        db.session.commit()
        return song.to_dict()

    return validation_error_messages(form.errors), 400

@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song():
    form = DeleteSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        song = Song.query.get(id)

        if not song: return abort(404)
        elif song.user_id != current_user.id: return abort(403)

        delete_file_from_s3(song.s3_audio_filename)
        delete_file_from_s3(song.s3_image_filename)

        db.session.delete(song)
        db.session.commit()
        return {"songId": song.id}

    return validation_error_messages(form.errors), 400
