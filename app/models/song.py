from sqlalchemy.sql import func
from .db import db


class Song(db.Model):
    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    audio = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    owner = db.relationship('User', back_populates='songs')
    likes = db.relationship('Like', back_populates='song', cascade='all, delete')
    comments = db.relationship('Comment', back_populates='song', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'audio': self.audio,
            'image': self.image,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'owner': self.owner.to_dict(),
            'likeCount': len(self.likes)
        }
