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

    ita = Song(
        title="It's Time Again",
        audio="https://klangwolke.s3.amazonaws.com/seeds/ItsTimeAgain.mp3",
        image="https://klangwolke.s3.amazonaws.com/seeds/ItsTimeAgain.jpg",
        s3_audio_filename="ItsTimeAgain.mp3",
        s3_image_filename="ItsTimeAgain.jpg",
        user_id=10
    )

    sc = Song(
        title="Sof Cell",
        audio="https://klangwolke.s3.amazonaws.com/seeds/SofCell.mp3",
        image="https://klangwolke.s3.amazonaws.com/seeds/SofCell.jpg",
        s3_audio_filename="SofCell.mp3",
        s3_image_filename="SofCell.jpg",
        user_id=11
    )

    lbti = Song(
        title="Lean Before the Interview",
        audio="https://klangwolke.s3.amazonaws.com/seeds/LeanBeforeTheInterview.mp3",
        image="https://klangwolke.s3.amazonaws.com/seeds/LeanBeforeTheInterview.jpg",
        s3_audio_filename="LeanBeforeTheInterview.mp3",
        s3_image_filename="LeanBeforeTheInterview.jpg",
        user_id=11
    )

    u = Song(
        title="Ultramax",
        audio="https://klangwolke.s3.amazonaws.com/seeds/Ultramax.mp3",
        image="https://klangwolke.s3.amazonaws.com/seeds/Ultramax.jpg",
        s3_audio_filename="Ultramax.mp3",
        s3_image_filename="Ultramax.jpg",
        user_id=11
    )

    db.session.add(aol)
    db.session.add(atwf)
    db.session.add(hb)
    db.session.add(roof)
    db.session.add(ti)
    db.session.add(med)
    db.session.add(med)
    db.session.add(nt)
    db.session.add(ita)
    db.session.add(sc)
    db.session.add(lbti)
    db.session.add(u)
    db.session.commit()

def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()
