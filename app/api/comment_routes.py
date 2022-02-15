from flask import Blueprint
from flask_login import login_required
from app.models import db, Comment, Song

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:song_id>')
def get_comments(song_id):

    
    comments = Comment.query.filter(Comment.song_id == song_id).order_by(Comment.created_at.desc())
    return {'comments': [comment.to_dict() for comment in comments]}
