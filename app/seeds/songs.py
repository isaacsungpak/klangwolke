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

    roof = Song(
        title='Roof',
        audio='https://klangwolke.s3.amazonaws.com/seeds/Roof.mp3',
        image='https://klangwolke.s3.amazonaws.com/seeds/Roof.jpg',
        s3_audio_filename='Roof.mp3',
        s3_image_filename='Roof.jpg',
        user_id=7
    )

    ti = Song(
        title='TRACK ID?',
        audio='https://klangwolke.s3.amazonaws.com/seeds/TRACK_ID.mp3',
        image='https://klangwolke.s3.amazonaws.com/seeds/TRACK_ID.jpg',
        s3_audio_filename='TRACK_ID.mp3',
        s3_image_filename='TRACK_ID.jpg',
        user_id=5
    )

    med = Song(
        title='Medicate',
        audio='https://klangwolke.s3.amazonaws.com/seeds/Medicate.mp3',
        image='https://klangwolke.s3.amazonaws.com/seeds/Medicate.jpg',
        s3_audio_filename='Medicate.mp3',
        s3_image_filename='Medicate.jpg',
        user_id=8
    )

    nt = Song(
        title="Nancy's Track",
        audio="https://klangwolke.s3.amazonaws.com/seeds/Nancy's+Track.mp3",
        image="https://klangwolke.s3.amazonaws.com/seeds/NancyTrack.jpg",
        s3_audio_filename="Nancy's Track.mp3",
        s3_image_filename="NancyTrack.jpg",
        user_id=9
    )

    db.session.add(aol)
    db.session.add(atwf)
    db.session.add(hb)
    db.session.add(roof)
    db.session.add(ti)
    db.session.add(med)
    db.session.add(med)
    db.session.add(nt)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()
