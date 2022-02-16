from flask import Blueprint, request, abort
from flask_login import login_required, current_user
from app.models import db, Comment, Song
from sqlalchemy.sql import func
from app.forms import FieldlessForm, CommentForm, validation_error_messages


comment_routes = Blueprint('comments', __name__)


# READ
@comment_routes.route('/<int:song_id>')
def get_comments(song_id):
    song = Song.query.get(song_id)
    if not song: return abort(404)

    comments = Comment.query.filter(Comment.song_id == song_id).order_by(Comment.created_at.desc())
    return {'comments': [comment.to_dict() for comment in comments]}


# CREATE
@comment_routes.route('/songs/<int:song_id>', methods=['POST'])
@login_required
def create_comment(song_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        song = Song.query.get(song_id)
        if not song: return abort(404)

        comment = Comment(
            user_id=current_user.id,
            song_id=song_id,
            content=form['content'].data,
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_error_messages(form.errors)}, 400


# UPDATE
@comment_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
            comment = Comment.query.get(id)
            if not comment: return abort(404)

            comment.content = form['content'].data
            comment.updated_at = func.now()
            db.session.commit()

            return comment.to_dict()
    return {'errors': validation_error_messages(form.errors)}, 400


# DELETE
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    form = FieldlessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment.query.get(id)
        if not comment: return abort(404)

        if comment.user_id != current_user.id: return abort(403)

        db.session.delete(comment)
        db.session.commit()
        return {'commentId': id}

    return {'errors': validation_error_messages(form.errors)}
