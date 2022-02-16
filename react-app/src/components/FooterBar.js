import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styled from 'styled-components';
import { useSong } from '../context/SongContext';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getQueueSong, getEasterEgg } from '../store/songs';

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

    @media screen and (max-width: 1240px) {
        width: 1000px;
    }

    @media screen and (max-width: 1000px) {
        width: 720px;
    }
`

const PlayerContainer = styled.div`
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;

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

    .rhap_volume-indicator {
        background-color: #FF002B;
    }

    .rhap_volume-bar {
        background-color: #C00021;
    }

    .rhap_additional-controls {
        flex: 0.5 0 auto;
    }

    .rhap_button-clear {
        transition: all 0.3s ease-in-out;
    }

    .rhap_button-clear:hover {
        color: #407BA7;
    }
`

const CurrentSong = styled.div`
    width: 249px;
    display: flex;
    border-left: 1px solid #222;

    #song-img {
        background-color: #555;
        background-image: url(${props => props.song?.image});
        height: 88px;
        width: 88px;
        background-size: cover;
        background-position: center;
    }

    #song-info {
        width: 151px;
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

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    #song-owner {
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        color: #AAA;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    a {
        text-decoration: none;
        color: #CCC;
    }

    a:hover {
        text-decoration: underline;
    }
`

function FooterBar() {
    const dispatch = useDispatch();
    const { queue, currentSong, setCurrentSong, setIsPlaying, player } = useSong();
    const song = useSelector(state => state.songs.entities.queueSong);

    const toPrev = () => {
        let prevSong;
        if (currentSong > 0) prevSong = currentSong - 1;
        else prevSong = queue.length - 1;

        setCurrentSong(prevSong);
    }

    const toNext = () => {
        let nextSong;
        if (currentSong < queue.length - 1) nextSong = currentSong + 1;
        else nextSong = 0;

        setCurrentSong(nextSong);
    }

    useEffect(() => {
        if (queue[currentSong] === 0) dispatch(getEasterEgg());
        else if (queue.length > 0) dispatch(getQueueSong(queue[currentSong]));
    }, [dispatch, queue, currentSong]);

    return (
        <BottomBar>
            <Content>
                <PlayerContainer>
                    <AudioPlayer
                        src={song?.audio}
                        showJumpControls={false}
                        showSkipControls={true}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={toNext}
                        onClickPrevious={toPrev}
                        onClickNext={toNext}
                        layout='horizontal'
                        ref={player}
                    />
                </PlayerContainer>

                <CurrentSong song={song}>
                    <div id="song-img"/>
                    <div id="song-info">
                        {queue[currentSong] === undefined ?
                            <>
                                <div id="song-title">No Song Playing</div>
                                <div id="song-owner">Artist Not Available</div>
                            </>:
                            <>
                                <Link to={`/songs/${queue[currentSong]}`}><div id="song-title">{song.title}</div></Link>
                                <div id="song-owner">{song.owner?.username}</div>
                            </>
                        }
                    </div>
                </CurrentSong>
            </Content>
        </BottomBar>
    );
}

export default FooterBar;
