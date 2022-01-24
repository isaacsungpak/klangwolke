from app.models import db, Song


# Adds a demo user, you can add other users here if you want
def seed_songs():
    aol = Song(
        title='Age of Love',
        audio='https://klangwolke.s3.amazonaws.com/seeds/Age_Of_Love.mp3',
        image='https://klangwolke.s3.amazonaws.com/seeds/Age_of_Love.jpg',
        s3_audio_filename='Age_Of_Love.mp3',
        s3_image_filename='Age_of_Love.jpg',
        user_id=4
    )

    atwf = Song(
        title='All This Was Fire',
        audio='https://klangwolke.s3.amazonaws.com/seeds/All_This_Was_Fire.mp3',
        image='https://klangwolke.s3.amazonaws.com/seeds/All_This_Was_Fire.jpg',
        s3_audio_filename='All_This_Was_Fire.mp3',
        s3_image_filename='All_This_Was_Fire.jpg',
        user_id=5
    )

    hb = Song(
        title='Head Blower',
        audio='https://klangwolke.s3.amazonaws.com/seeds/Head_Blower.mp3',
        image='https://klangwolke.s3.amazonaws.com/seeds/Head_Blower.jpg',
        s3_audio_filename='Head_Blower.mp3',
        s3_image_filename='Head_Blower.jpg',
        user_id=6
    )



    db.session.add(aol)
    db.session.add(atwf)
    db.session.add(hb)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()
