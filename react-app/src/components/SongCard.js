import styled from 'styled-components';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import EditSongModal from './Modals/EditSongModal';
import DeleteSongModal from './Modals/DeleteSongModal';
import LikeButton from './Buttons/LikeButton';
import PlayButton from './Buttons/PlayButton';
import QueueButton from './Buttons/QueueButton';
import AddToPlaylistModal from './Modals/AddToPlaylistModal';

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
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        width: 100%;
        height: 100%;
    }

    .actions:not(#play, #like) {
        color: #FFF;
    }

    .actions:not(#play, #like):hover {
        color: #407BA7;
    }

    &:hover #overlay {
        opacity: 100%;
    }

    #play {
        grid-row: 2/4;
        grid-column: 2/4;
        font-size: 50px;
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

    // #song-title:hover, #song-owner:hover {
    //     text-decoration: underline;
    // }
`

function SongCard({song}) {
    const user = useSelector(state => state.session.user);


    return (
        <>
            {song &&
                <Card image={song.image}>
                    <div alt={`${song.title} Artwork`} className="song-artwork">
                        <div id="overlay">
                            <PlayButton songId={song.id} />
                            <QueueButton songId={song.id} />
                            {user &&
                            <>
                                <LikeButton songId={song.id} />
                                <AddToPlaylistModal songId={song.id} />
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

                    {/* <Link to={`/songs/${song.id}`}><div id="song-title">{song.title}</div></Link>
                    <Link to={`/users/${song.owner.id}`}><div id="song-owner">{song.owner.username}</div></Link> */}
                    <div id="song-title">{song.title}</div>
                    <div id="song-owner">{song.owner.username}</div>
            </Card>
            }
        </>
    )
}

export default SongCard;
