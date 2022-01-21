from unittest import removeHandler
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo User',
        email='demo_user@beispiel.de',
        password='password'
    )

    remodnar = User(
        username='remodnar',
        email='remodnar@mate-club.de',
        password='password'
    )

    bargllam = User(
        username='bargllam',
        email='bargllam@mate-club.de',
        password='password'
    )

    link = User(
        username='Link',
        email='link@link.de',
        password='password'
    )


    db.session.add(demo)
    db.session.add(remodnar)
    db.session.add(bargllam)
    db.session.add(link)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
