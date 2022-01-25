import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSong } from '../context/SongContext';
import { deleteSong } from '../store/songs';

const Card = styled.div`
    width: 175px;
    height: 250px;
    margin: 10px;

    .song-artwork {
        background-image: url(${props => props.image});
        background-size: cover;
        background-position: center;
        width: 175px;
        height: 175px;
        position: relative;
        box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.5);
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
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .actions:hover {
        color: #407BA7;
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
        color: ${props => props.isPlaying ? "#FF002B" : "#FFF"};
    }

    #play:hover {
        color: ${props => props.isPlaying ? "#FF002B" : "#407BA7"}
    }

    #queue {
        grid-row: 1;
        grid-column: 4;
        width: 100%;
        height: 100%;
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

    a {
        text-decoration: none;
    }

    #song-title {
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
        color: #000;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    #song-owner {
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        color: #888;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    #song-title:hover, #song-owner:hover {
        text-decoration: underline;
    }
`

function SongCard({song}) {
    const dispatch = useDispatch();

    const { currentSong, setCurrentSong } = useSong();

    const user = useSelector(state => state.session.user);
    const likes = useSelector(state => state.songs.entities.likes);

    const deleteButton = async () => {
        dispatch(deleteSong(song.id));
    }

    function addSongToQueue() {
        return;
    }

    return (
        <>
            {song &&
                <Card image={song.image} isPlaying={song.id === currentSong.id}>
                    <div alt={`${song.title} Artwork`} className="song-artwork">
                        <div id="overlay">
                            <div id="play" className='actions' onClick={() => setCurrentSong(song)}><i className="fas fa-play-circle" /></div>
                            <div id="queue" className='actions' onClick={addSongToQueue}><i className="fas fa-plus"/></div>

                            {user &&
                            <>
                                <div id="like" className='actions'>{likes.includes(song.id) ? <i className="fas fa-heart" /> : <i className="far fa-heart" />}</div>
                                <div id="playlist" className='actions'><i className="fas fa-bars" /></div>
                            </>
                            }

                            {(user && user.id === song.owner.id) &&
                                <>
                                    <div id="edit" className='actions'><i className="fas fa-edit" /></div>
                                    <div id="delete" className='actions' onClick={deleteButton}><i className="fas fa-dumpster" /></div>
                                </>
                            }
                        </div>
                    </div>

                    <Link to={`/songs/${song.id}`}><div id="song-title">{song.title}</div></Link>
                    <Link to={`/users/${song.owner.id}`}><div id="song-owner">{song.owner.username}</div></Link>
            </Card>
            }
        </>
    )
}

export default SongCard;
