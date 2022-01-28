from unittest import removeHandler
from app.models import db, User

def seed_users():
    demo = User(
        username='Demo User',
        email='demo_user@beispiel.de',
        password='password'
    )

    remodnar = User(
        username='remodnar',
        email='remodnar@mate-club.de',
        password='ppassword'
    )

    bargllam = User(
        username='bargllam',
        email='bargllam@mate-club.de',
        password='paassword'
    )

    link = User(
        username='Link',
        email='link@link.de',
        password='passsword'
    )

    ho = User(
        username='Héctor Oaks',
        email='hector@oaks.de',
        password='passwword'
    )

    chlar = User(
        username='Chlär',
        email='ch@lar.de',
        password='passwoord'
    )

    kk = User(
        username='Kev Koko',
        email='kev@ko.ko',
        password='passworrd'
    )

    cadans = User(
        username='Cadans',
        email='cad@an.s',
        password='passwordd'
    )

    jm = User(
        username='Julian Muller',
        email='jul@ian.muller',
        password='pppassword'
    )


    db.session.add(demo)
    db.session.add(remodnar)
    db.session.add(bargllam)
    db.session.add(link)
    db.session.add(ho)
    db.session.add(chlar)
    db.session.add(kk)
    db.session.add(cadans)
    db.session.add(jm)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
