from sqlalchemy.sql import func
from .db import db


class Playlist(db.Model):
    __tablename__ = "playlists"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    owner = db.relationship('User', back_populates='playlists')
    songs = db.relationship('Song', secondary='songs_to_playlists')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'userId': self.user_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'owner': self.owner.to_dict(),
        }
