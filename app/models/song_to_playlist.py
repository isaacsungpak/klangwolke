from sqlalchemy import PrimaryKeyConstraint
from sqlalchemy.sql import func

from .db import db


class SongToPlaylist(db.Model):
    __tablename__ = 'songs_to_playlists'

    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint(song_id, playlist_id, name='song_to_playlist_pk'),
    )

    song = db.relationship('Song', back_populates='playlist_connections')
    playlist = db.relationship('Playlist', back_populates='song_connections')
