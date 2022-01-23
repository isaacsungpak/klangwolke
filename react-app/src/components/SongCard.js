import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Card = styled.div`
    width: 175px;
    height: 250px;

    .song-artwork {
        background-image: url(${props => props.image});
        background-size: contain;
        background-position: center;
        width: 175px;
        height: 175px;
        position: relative;
    }

    #overlay {
        width: 155px;
        height: 155px;
        padding: 10px;

        background-color: rgba(0, 0, 0, 0.7);
        opacity: 0%;

        transition: all 0.3s ease-in-out;

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
        gap: 20px;
    }

    .actions {
        color: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &:hover #overlay {
        opacity: 100%;
    }

    #play {
        grid-row: 2/4;
        grid-column: 2/4;
        width: 100%;
        height: 100%;
        font-size: 50px;
    }

    #like {
        grid-row: 4;
        grid-column: 1;
        width: 100%;
        height: 100%;
    }

    #playlist {
        grid-row: 4;
        grid-column: 2;
        width: 100%;
        height: 100%;
    }

    #edit {
        grid-row: 4;
        grid-column: 3;
        width: 100%;
        height: 100%;
    }

    #delete {
        grid-row: 4;
        grid-column: 4;
        width: 100%;
        height: 100%;
    }

    .song-title {
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
    }

    .song-owner {
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        color: #888;
    }
`

function SongCard({song}) {
    const user = useSelector(state => state.session.user);
    const likes = useSelector(state => state.songs.entities.likes);

    return (
        <Card image={song.image}>
            <div alt={`${song.title} Artwork`} className="song-artwork">
                <div id="overlay">
                    <div id="play" className='actions'><i className="fas fa-play-circle" /></div>
                    
                    {user &&
                    <>
                        <div id="like" className='actions'>{likes.has(song.id) ? <i className="fas fa-heart" /> : <i className="far fa-heart" />}</div>
                        <div id="playlist" className='actions'><i className="fas fa-bars" /></div>
                    </>
                    }

                    {(user && user.id === song.owner.id) &&
                        <>
                            <div id="edit" className='actions'><i className="fas fa-edit" /></div>
                            <div id="delete" className='actions'><i className="fas fa-dumpster" /></div>
                        </>
                    }
                </div>
            </div>

            <div className="song-title">{song.title}</div>
            <div className="song-owner">{song.owner.username}</div>
        </Card>
    )
}

export default SongCard;
