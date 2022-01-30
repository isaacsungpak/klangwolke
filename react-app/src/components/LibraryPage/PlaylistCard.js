import styled from 'styled-components';
import EditPlaylistModal from '../Modals/EditPlaylistModal';
import DeletePlaylistModal from '../Modals/DeletePlaylistModal';
import { Link } from 'react-router-dom';

const Card = styled.div`
    width: 180px;
    height: 225px;
    margin: 10px;

    @media screen and (max-width: 1240px) {
        width: 150px;
        height: 200px;
    }

    #artwork {
        background-color: #AAA;
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

    &:hover #overlay {
        opacity: 100%;
    }

    #circle {
        grid-row: 2/4;
        grid-column: 2/4;
        font-size: 80px;
        color: #FFF;
        opacity: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #img-link {
        grid-row: 1/5;
        grid-column: 1/5;
    }

    #song-count {
        grid-row: 2/4;
        grid-column: 2/4;
        font-size: 30px;
        color: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
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

    #edit {
        grid-row: 4;
        grid-column: 1;
    }

    #delete {
        grid-row: 4;
        grid-column: 4;
    }

    a {
        text-decoration: none;
    }

    #title {
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
        color: #000;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    #title:hover {
        text-decoration: underline;
    }
`

function PlaylistCard({playlist}) {
    return (
        <>
            {playlist &&
                <Card image={playlist.image}>
                    <div id='artwork' alt={`Cover for ${playlist.title}`}>
                        <div id='overlay'>
                            {/* <div id='circle'><i className="fas fa-circle"/></div> */}
                            <Link to={`/playlists/${playlist.id}`} id='img-link'/>
                            <div id='song-count'><div>{playlist.songCount === 1 ? '1 song' : `${playlist.songCount} songs`}</div></div>
                            <EditPlaylistModal id='edit' playlist={playlist} />
                            <DeletePlaylistModal id='delete' playlist={playlist} />
                        </div>
                    </div>
                    <Link to={`/playlists/${playlist.id}`}>
                        <div id='title'>{playlist.title}</div>
                    </Link>
                </Card>
            }
        </>
    )
}

export default PlaylistCard;
