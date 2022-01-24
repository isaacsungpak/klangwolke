from sqlalchemy.sql import func
from .db import db
from .song_to_playlist import SongToPlaylist


class Playlist(db.Model):
    __tablename__ = "playlists"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    owner = db.relationship('User', back_populates='playlists')

    song_connections = db.relationship('SongToPlaylist', back_populates='playlist', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'userId': self.user_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'owner': self.owner.to_public(),
            'songCount': len(self.song_connections),
            'image': "" if len(self.song_connections) == 0 else self.song_connections[0].song.image
        }
