import styled from "styled-components";
import { useSong } from "../../context/SongContext";

const Tab = styled.div`
    width: 100%;
    height: 30px;
    background-color: white;
    display: grid;
    grid-template-columns: 5px 30px 50px 1fr;
    grid-template-rows: 1fr;
    gap: 10px;
    padding: 7px 0px;
    border-bottom: 1px solid #CCC;
    font-size: 16px;
    color: #AAA;

    &:hover {
        background-color: #EEE;
    }

    #image {
        grid-column: 2;
        grid-row: 1;
        background-image: url(${props => props.image});
        background-size: cover;
        background-position: center;
        width: 100%;
        aspect-ratio: 1;
    }

    #image-overlay {
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0%;
    }

    #play {
        font-size: 20px;
        transition: all 0.3s ease-in-out;
        color: ${props => props.isPlaying ? "#FF002B" : "#FFF"};
    }

    &:hover #image-overlay{
        opacity: 100%;
    }

    #index {
        grid-column: 3;
        grid-row: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #info {
        grid-column: 4;
        grid-row: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #owner {
        max-width: 530px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        @media screen and (max-width: 1240px) {
            max-width: 300px;
        }
        @media screen and (max-width: 1000px) {
            max-width: 200px;
        }
    }

    #hyphen {
        margin: 0px 10px;
    }

    #title {
        color: ${props => props.isPlaying ? '#407BA7' : 'black'};
        max-width: 530px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        @media screen and (max-width: 1240px) {
            max-width: 300px;
        }
        @media screen and (max-width: 1000px) {
            max-width: 200px;
        }
    }

    #overlay {
        grid-column: 1/4;
        grid-row: 1;
        z-index: 3;
        position: relative;

        height: 100%;
        width: 100%;

        background-color: rgba(0, 0, 0, 0.7);
        opacity: 0%;

        transition: all 0.3s ease-in-out;

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
        gap: 20px;
    }
`

function SongTab({num, song, playlistId}) {
    const { currentSong, setCurrentSong, isPlaying, setIsPlaying, player} = useSong();

    const playButton = () => {
        if (isPlaying) {
            if (currentSong.id === song.id) {
                setIsPlaying(false);
                return player.current.audio.current.pause();
            } else return setCurrentSong(song);
        } else {
            setIsPlaying(true);
            if (currentSong.id === song.id) return player.current.audio.current.play();
            else return setCurrentSong(song);
        }
    };

    return (
        <Tab image={song.image} isPlaying={currentSong.id === song.id}>
            <div id='image'>
                <div id='image-overlay'>
                    <div id="play" onClick={playButton}>
                        {(song.id === currentSong.id && isPlaying) ? <i className="fas fa-pause-circle" /> : <i className="fas fa-play-circle" />}
                    </div>
                </div>
            </div>
            <div id='index'><div>{num}</div></div>
            <div id='info'>
                <span id='owner'>{song.owner.username}</span>
                <span id='hyphen'>-</span>
                <span id='title'>{song.title}</span>
            </div>
        </Tab>
    )
}

export default SongTab;
