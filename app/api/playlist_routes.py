from crypt import methods
from flask import Blueprint, request, abort
from flask_login import current_user, login_required
from app.models import db, Playlist, SongToPlaylist, Song
from app.forms import CreatePlaylistForm, EditPlaylistForm, FieldlessForm, validation_error_messages
from sqlalchemy.sql import func

playlist_routes = Blueprint('playlists', __name__)

# create playlist with first song
@playlist_routes.route('/', methods=['POST'])
@login_required
def create_playlist():
    form = CreatePlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        title = form.data['title']
        song_id = form.data['songId']

        playlist = Playlist(
            title=title,
            user_id=current_user.id
        )
        db.session.add(playlist)
        db.session.commit()

        song = Song.query.get(song_id)
        if song:
            stp = SongToPlaylist(
                song_id=song_id,
                playlist_id=playlist.id
            )
            db.session.add(stp)
            db.session.commit()

        return playlist.to_dict()

    return {"errors": validation_error_messages(form.errors)}, 400

# get all playlists / allow search
@playlist_routes.route('/')
@login_required
def get_playlists():
    search_key = request.args.get("key")

    filters = [Playlist.user_id == current_user.id]
    if search_key:
        filters.append(Playlist.title.ilike(f"%{search_key}%"))
    playlists = Playlist.query.filter(*filters).all()

    return {
        'playlists': [playlist.to_dict() for playlist in playlists]
    }

# get playlists that do not already include a specified song
@playlist_routes.route('/songs/<int:song_id>')
@login_required
def get_playlists_without_song(song_id):
    playlists = []
    user_playlists = Playlist.query.filter(Playlist.user_id == current_user.id).all()
    for user_playlist in user_playlists:
        stp = SongToPlaylist.query.get((song_id, user_playlist.id))
        if not stp: playlists.append(user_playlist)

    return {
        'auxPlaylists': [playlist.to_dict() for playlist in playlists]
    }

# get specific playlist
@playlist_routes.route('/<int:id>')
@login_required
def get_playlist(id):
    playlist = Playlist.query.get(id)

    if not playlist:
        return abort(404)
    elif playlist.user_id != current_user.id:
        return abort(403)

    return playlist.to_dict()

# add song to playlist
@playlist_routes.route('/<int:playlist_id>/songs/<int:song_id>', methods=['POST'])
@login_required
def add_song_to_playlist(playlist_id, song_id):
    playlist = Playlist.query.get(playlist_id)
    if not playlist: return abort(400)
    elif playlist.user_id != current_user.id: return abort(403)

    song = Song.query.get(song_id)
    if not song: return abort(400)

    stp = SongToPlaylist.query.get((song_id, playlist_id))
    if stp: return {"errors": "Provided song is already in selected playlist"}, 400

    stp = SongToPlaylist(
        song_id=song_id,
        playlist_id=playlist_id
    )
    db.session.add(stp)
    playlist.updated_at = func.now()
    db.session.commit()

    return playlist.to_dict()

# edit specific playlist
@playlist_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_playlist(id):
    form = EditPlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        title = form.data['title']

        playlist = Playlist.query.get(id)

        if not playlist:
            return abort(404)
        elif playlist.user_id != current_user.id:
            return abort(403)

        playlist.title = title
        playlist.updated_at = func.now()
        db.session.commit()

        return playlist.to_dict()

    return {"errors": validation_error_messages(form.errors)}, 400

# delete specific playlist
@playlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_playlist(id):
    form = FieldlessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        playlist = Playlist.query.get(id)

        if not playlist:
            return abort(404)
        elif playlist.user_id != current_user.id:
            return abort(403)

        db.session.delete(playlist)
        db.session.commit()
        return {"playlistId": id}

    return {"errors": "Request could not be completed at this time. Please try again."}, 400
