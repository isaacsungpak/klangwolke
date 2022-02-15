from sqlalchemy import PrimaryKeyConstraint
from sqlalchemy.sql import func

from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    song = db.relationship('Song', back_populates='comments')
    user = db.relationship('User')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'songId': self.song_id,
            'content': self.content,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'song': self.song.to_dict(),
            'user': self.user.to_public()
        }
