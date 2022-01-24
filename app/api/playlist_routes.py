from crypt import methods
from flask import Blueprint, request, abort
from flask_login import current_user, login_required
from app.models import db, Playlist, SongToPlaylist, Song
from app.forms import CreatePlaylistForm

playlist_routes = Blueprint('playlists', __name__)

# get all songs / allow search
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

@playlist_routes.route('/<int:id>')
@login_required
def get_playlist(id):
    playlist = Playlist.query.get(id)

    if not playlist:
        return abort(404)
    elif playlist.user_id != current_user.id:
        return abort(403)

    return {
        'playlists': [playlist.to_dict()]
    }


# create playlist with first song
@playlist_routes.route('/', methods=['POST'])
@login_required
def create_playlist():
    form = CreatePlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.json
    form.title = data['title']
    form.song_id = data['song_id']

    if form.validate_on_submit():

        song_id = form.song_id
        song = Song.query.get(song_id)
        if not song: return abort(400)

        playlist = Playlist(
            title=form.title,
            user_id=current_user.id
        )
        db.session.add(playlist)
        db.session.commit()

        stp = SongToPlaylist(
            song_id=song_id,
            playlist_id=playlist.id
        )
        db.session.add(stp)
        db.session.commit()

    return {
        'playlists': [playlist.to_dict()]
    }

# add song to playlist
@playlist_routes.route('/<id:playlist_id>/songs/<int:song_id>', methods=['POST'])
@login_required
def add_song_to_playlist(playlist_id, song_id):
    playlist = Playlist.query.get(playlist_id)
    if not playlist: return abort(400)
    elif playlist.user_id != current_user.id: return abort(403)

    song = Song.query.get(song_id)
    if not song: return abort(400)

    stp = SongToPlaylist(
        song_id=song_id,
        playlist_id=playlist_id
    )
    db.session.add(stp)
    db.session.commit()

    return {
        'playlists': [playlist.to_dict()]
    }
