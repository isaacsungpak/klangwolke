from crypt import methods
from flask import Blueprint, request, abort
from flask_login import login_required, current_user
from app.file_helpers import audio_file_is_ok, image_file_is_ok, title_is_ok
from app.models import db, Song, Playlist, SongToPlaylist, Like
from app.forms import CreateSongForm, EditSongForm, FieldlessForm, validation_error_messages
from app.s3_helpers import get_unique_filename, upload_file_to_s3, delete_file_from_s3
from werkzeug.utils import secure_filename

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def get_songs():
    search_key = request.args.get("key")
    filters = []
    if search_key:
        filters.append(Song.title.ilike(f"%{search_key}%"))
    songs = Song.query.filter(*filters).all()

    likes = []
    if current_user:
        for song in songs:
            like = Like.query.get((current_user.id, song.id))
            if like: likes.append(song.id)
    return {
        "songs": [song.to_dict() for song in songs],
        'likes': likes
    }


@song_routes.route('/like')
@login_required
def get_liked_songs():
    likes = Like.query.filter(Like.user_id == current_user.id).order_by(Like.created_at.desc()).all()

    return {
        "songs": [like.song.to_dict() for like in likes],
        "likes": [like.song_id for like in likes]
    }


@song_routes.route('/like/<int:id>', methods=['POST'])
@login_required
def like_song(id):
    song = Song.query.get(id)
    if not song:
        return abort(404)
    like = Like.query.get((current_user.id, id))
    if like:
        return abort(404)

    like = Like(
        user_id=current_user.id,
        song_id=id
    )
    db.session.add(like)
    db.session.commit()
    return {"songId": id}


@song_routes.route('/like/<int:id>', methods=['DELETE'])
@login_required
def unlike_song(id):
    song = Song.query.get(id)
    if not song:
        return abort(404)
    like = Like.query.get((current_user.id, id))
    if not like:
        return abort(404)

    db.session.delete(like)
    db.session.commit()
    return {"songId": id}

 ###############################################################

# get specific song by id
@song_routes.route('/<int:id>')
def get_song(id):
    song = Song.query.get(id)

    if not song:
        return abort(404)

    likes = []
    if current_user:
        like = Like.query.get((current_user.id, song.id))
        if like: likes.append(song.id)

    return {
        "songs": song.to_dict(),
        'likes': likes
    }

@song_routes.route('/playlist/<int:id>')
@login_required
def get_playlist_songs(id):
    playlist = Playlist.query.get(id)

    if not playlist:
        return abort(404)
    elif playlist.user_id != current_user.id:
        return abort(403)

    song_connections = SongToPlaylist.query.filter(SongToPlaylist.playlist_id == id).order_by(SongToPlaylist.created_at.desc()).all()
    songs = [sc.song for sc in song_connections]

    likes = []
    for song in songs:
        like = Like.query.get((current_user.id, song.id))
        if like: likes.append(song.id)

    return {
        'songs': [song.to_dict() for song in songs],
        'likes': likes
    }

@song_routes.route('/guest_home')
def get_guest_homepage():
    songs_per_homepage = 20
    new_songs = Song.query.order_by(Song.created_at.desc()).limit(songs_per_homepage).all()
    return {
        'songs': [song.to_dict() for song in new_songs],
        'newSongs': [song.id for song in new_songs]
    }

# get songs for homepage if user is logged in
@song_routes.route('/user_home')
@login_required
def get_user_homepage():
    songs_per_homepage = 10
    new_songs = Song.query.order_by(Song.created_at.desc()).limit(songs_per_homepage).all()
    liked = Like.query.filter(Like.user_id == current_user.id).order_by(Like.created_at.desc()).limit(songs_per_homepage).all()
    liked_songs = [like.song for like in liked]

    likes = []
    for song in new_songs:
        like = Like.query.get((current_user.id, song.id))
        if like:
            likes.append(song.id)

    return {
        'songs': [song.to_dict() for song in list(set(new_songs + liked_songs))],
        'newSongs': [song.id for song in new_songs],
        'likedSongs': [like.song_id for like in liked],
        'likes': likes
    }

@song_routes.route('/', methods=['POST'])
@login_required
def create_song():
    form = CreateSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if "audio" not in request.files:
        return {"errors": "Audio required."}, 400
    form.data['audio'] = request.files["audio"]

    if "image" not in request.files:
        return {"errors": "Image required."}, 400
    form.data['image'] = request.files["image"]

    if form.validate_on_submit():
        title = form.data['title']
        audio = form.data['audio']
        image = form.data['image']

        audio.filename = get_unique_filename(audio.filename)
        audio_s3_upload = upload_file_to_s3(audio)
        if "url" not in audio_s3_upload: return audio_s3_upload, 400

        image.filename = get_unique_filename(image.filename)
        image_s3_upload = upload_file_to_s3(image)
        if "url" not in image_s3_upload: return image_s3_upload, 400

        new_song = Song(
            user_id=current_user.id,
            title=title,
            audio=audio_s3_upload["url"],
            image=image_s3_upload["url"],
            s3_audio_filename=audio.filename,
            s3_image_filename=image.filename,
        )

        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict()

    return {'errors': validation_error_messages(form.errors)}

# update song title
@song_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_song(id):
    form = EditSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        title = form.data['title']

        song = Song.query.get(id)

        if not song: return abort(404)
        elif song.user_id != current_user.id: return abort(403)

        song.title = title
        db.session.commit()
        return song.to_dict()

    return {'errors': validation_error_messages(form.errors)}, 400

# delete song
@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song(id):
    form = FieldlessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        song = Song.query.get(id)

        if not song: return abort(404)
        elif song.user_id != current_user.id: return abort(403)

        delete_file_from_s3(song.s3_audio_filename)
        delete_file_from_s3(song.s3_image_filename)

        db.session.delete(song)
        db.session.commit()
        return {"songId": id}

    return {"errors": "Request could not be completed at this time. Please try again."}, 400

@song_routes.route('/<int:song_id>/playlists/<int:playlist_id>', methods=['DELETE'])
@login_required
def remove_song_from_playlist(playlist_id, song_id):
    stp = SongToPlaylist.query.get((song_id, playlist_id))
    if not stp: return abort(400)
    elif stp.playlist.user_id != current_user.id: return abort(403)

    db.session.delete(stp)
    db.session.commit()

    return {"songId": song_id}
