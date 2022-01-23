import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styled from 'styled-components';
import { useSong } from '../context/SongContext';
import { Link } from 'react-router-dom';

const BottomBar = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: black;
`

const Content = styled.div`
    width: 1240px;
    justify-content: center;
    background-color: black;
    display: flex;
`

const PlayerContainer = styled.div`
    width: 1040px;

    .rhap_container {
        background-color: black;
    }

    .rhap_progress-filled {
        background-color: #C00021;
    }

    .rhap_progress-indicator {
        background-color: #FF002B;
    }

    .rhap_button-clear, .rhap_time {
        color: white;
    }
`

const CurrentSong = styled.div`
    width: 299px;
    display: flex;
    border-left: 1px solid #555;

    #song-img {
        background-color: #555;
        background-image: url(${props => props.song?.image});
        height: 88px;
        width: 88px;
        background-size: contain;
        background-position: center;
    }

    #song-info {
        width: 201px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 10px;
    }

    #song-title {
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
        color: #FFF;
    }

    #song-owner {
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        color: #AAA;
    }

    a {
        text-decoration: none;
    }

    #song-title:hover, #song-owner:hover {
        text-decoration: underline;
    }
`

function FooterBar() {
    const { currentSong } = useSong();
    return (
        <BottomBar>
            <Content>
                <PlayerContainer>
                    <AudioPlayer src={currentSong?.audio} />
                </PlayerContainer>

                <CurrentSong song={currentSong}>
                    <div id="song-img"/>
                    <div id="song-info">
                        {currentSong.id === undefined ?
                            <>
                                <div id="song-title">No Song Playing</div>
                                <div id="song-owner">Artist Not Available</div>
                            </>:
                            <>
                                <Link to={`/songs/${currentSong.id}`}><div id="song-title">{currentSong.title}</div></Link>
                                <Link to={`/users/${currentSong.owner.id}`}><div id="song-owner">{currentSong.owner.username}</div></Link>
                            </>
                        }
                    </div>
                </CurrentSong>
            </Content>
        </BottomBar>
    );
}

export default FooterBar;
