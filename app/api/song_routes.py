from flask import Blueprint, request, abort
from flask_login import login_required, current_user
from app.file_helpers import audio_file_is_ok, image_file_is_ok, title_is_ok
from app.models import db, Song, Like
from app.forms import CreateSongForm, EditSongForm, DeleteSongForm, validation_error_messages
from app.s3_helpers import get_unique_filename, upload_file_to_s3, delete_file_from_s3, get_s3_signature
from werkzeug.datastructures import FileStorage


song_routes = Blueprint('songs', __name__)

# get all songs / allow search
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

# homepage if user is note logged in
@song_routes.route('/guest_home')
def get_guest_homepage():
    # new_page = request.args.get("new")
    songs_per_homepage = 7
    new_songs = Song.query.order_by(Song.created_at.desc()).limit(songs_per_homepage).all()
    # new_songs = Song.query.order_by(Song.created_at.desc()).paginate(new_page, songs_per_homepage, error_out=False)
    return {
        'songs': [song.to_dict() for song in new_songs],
        'newSongs': [song.id for song in new_songs]
    }

# get songs for homepage if user is logged in
@song_routes.route('/user_home')
# @login_required
def get_user_homepage():
    # new_page = request.args.get("new")
    # likes_page = request.args.get("likes")
    songs_per_homepage = 7
    new_songs = Song.query.order_by(Song.created_at.desc()).limit(songs_per_homepage).all()
    liked = Like.query.filter(Like.user_id == current_user.id).order_by(Like.created_at.desc()).limit(songs_per_homepage).all()
    # new_songs = Song.query.order_by(Song.created_at.desc()).paginate(new_page, songs_per_homepage, error_out=False)
    # liked = Like.query.filter(Like.user_id == current_user.id).order_by(Like.created_at.desc()).paginate(likes_page, songs_per_homepage, error_out=False)
    liked_songs = [like.song for like in liked]

    likes = set(liked)
    for song in new_songs:
        like = Like.query.get((current_user.id, song.id))
        if like:
            likes.add(song.id)

    return {
        'songs': [song.to_dict() for song in list(set(new_songs + liked_songs))],
        'newSongs': [song.id for song in new_songs],
        'likedSongs': [like.song_id for like in likes],
        'likes': list(likes)
    }


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
        "songs": [song.to_dict()],
        'likes': likes
    }

# get songs by search key
@song_routes.route('/', methods=['POST'])
@login_required
def create_song():
    form = CreateSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if "audio" not in request.files:
        return {"errors": "audio required"}, 400
    audio = request.files["audio"]
    if not audio_file_is_ok(audio.filename):
        return {"errors": "audio format not accepted"}, 400

    if "image" not in request.files:
        return {"errors": "image required"}, 400
    image = request.files["image"]
    if not image_file_is_ok(image.filename):
        return {"errors": "image format not accepted"}, 400

    if "title" not in request.form:
        return {"errors": "audio required"}, 400
    title = request.form["title"]
    if not title_is_ok(title):
        return {"errors": "title must be between 5 and 255 characters"}, 400

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

    # new_song = Song(
    #     user_id=current_user.id,
    #     title=title,
    #     audio=audio_s3_upload["url"],
    #     image=image_s3_upload["url"],
    #     s3_audio_filename=audio_filename,
    #     s3_image_filename=image_filename
    # )

    # new_song = Song(
    #     user_id=current_user.id,
    #     title=title,
    #     audio='https://klangwolke.s3.amazonaws.com/seeds/Age_Of_Love.mp3',
    #     image='https://klangwolke.s3.amazonaws.com/seeds/Age_of_Love.jpg',
    #     s3_audio_filename='abc.mp3',
    #     s3_image_filename='abc.jpg'
    # )

    db.session.add(new_song)
    db.session.commit()
    return new_song.to_dict()

# update song title
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

# delete song
@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song(id):
    form = DeleteSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        song = Song.query.get(id)

        if not song: return abort(404)
        elif song.user_id != current_user.id: return abort(403)

        # delete_file_from_s3(song.s3_audio_filename)
        # delete_file_from_s3(song.s3_image_filename)

        db.session.delete(song)
        db.session.commit()
        return {"songId": id}

    return validation_error_messages(form.errors), 400

@song_routes.route('/sign_s3/')
def sign_s3():
    file_name = request.args.get('file_name')
    file_type = request.args.get('file_type')
    return get_s3_signature(file_name=file_name, file_type=file_type)
