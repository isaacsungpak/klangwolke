from app.models import db, Song


# Adds a demo user, you can add other users here if you want
def seed_songs():
    aol = Song(
        title='Age of Love',
        audio='https://klangwolke.s3.amazonaws.com/Age_Of_Love.mp3',
        image='https://klangwolke.s3.amazonaws.com/Age_of_Love.jpg',
        s3_audio_filename='Age_Of_Love.mp3',
        s3_image_filename='Age_Of_Love.jpg',
        user_id=4
    )

    db.session.add(aol)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()
