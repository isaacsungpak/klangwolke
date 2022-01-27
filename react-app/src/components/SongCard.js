import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSong } from '../context/SongContext';
import { removeSongFromPlaylist } from '../store/songs';
import EditSongModal from './Modals/EditSongModal';
import DeleteSongModal from './Modals/DeleteSongModal';

const Card = styled.div`
    width: 180px;
    height: 225px;
    margin: 10px;

    @media screen and (max-width: 1240px) {
        width: 150px;
        height: 200px;
    }

    .song-artwork {
        background-image: url(${props => props.image});
        background-size: cover;
        background-position: center;
        width: 100%;
        aspect-ratio: 1;
        position: relative;
        box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.5);
        margin-bottom: 5px;
    }

    #overlay {
        flex: 1;
        aspect-ratio: 1;
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
        width: 100%;
        height: 100%;
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
        font-size: 50px;
        color: ${props => props.isPlaying ? "#FF002B" : "#FFF"};
    }

    #play:hover {
        color: ${props => props.isPlaying ? "#FF002B" : "#407BA7"}
    }

    #queue {
        grid-row: 1;
        grid-column: 1;
    }

    #like {
        grid-row: 4;
        grid-column: 1;
    }

    #playlist {
        grid-row: 4;
        grid-column: 2;
    }

    #remove {
        grid-row: 1;
        grid-column: 4;
        font-size: 18px;
    }

    #remove:hover {
        color: #FF002B;
    }

    #edit {
        grid-row: 4;
        grid-column: 3;
    }

    #delete {
        grid-row: 4;
        grid-column: 4;
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

function SongCard({song, playlist}) {
    const dispatch = useDispatch();

    const { currentSong, setCurrentSong } = useSong();

    const user = useSelector(state => state.session.user);
    const likes = useSelector(state => state.songs.entities.likes);

    const removeFromPlaylist = () => {
        dispatch(removeSongFromPlaylist({playlistId: playlist.id, songId: song.id}));
    }

    return (
        <>
            {song &&
                <Card image={song.image} isPlaying={song.id === currentSong.id}>
                    <div alt={`${song.title} Artwork`} className="song-artwork">
                        <div id="overlay">
                            <div id="play" className='actions' onClick={() => setCurrentSong(song)}><i className="fas fa-play-circle" /></div>
                            {/* <div id="queue" className='actions' onClick={addSongToQueue}><i className="fas fa-plus"/></div> */}

                            {user &&
                            <>
                                <div id="like" className='actions'>{likes.includes(song.id) ? <i className="fas fa-heart" /> : <i className="far fa-heart" />}</div>
                                <div id="playlist" className='actions'><i className="fas fa-bars" /></div>
                                { playlist && <div id="remove" className='actions' onClick={() => removeFromPlaylist()}><i className="fas fa-times" /></div> }
                            </>
                            }

                            {(user && user.id === song.owner.id) &&
                                <>
                                    <EditSongModal song={song}/>
                                    <DeleteSongModal song={song}/>
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
