from sqlalchemy import PrimaryKeyConstraint
from sqlalchemy.sql import func

from .db import db


class Like(db.Model):
    __tablename__ = 'likes'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint(user_id, song_id, name='user_song_like_pk'),
    )

    song = db.relationship('Song', back_populates='likes')
    

    def to_dict(self):
        return {
            'song': self.song.to_dict,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
