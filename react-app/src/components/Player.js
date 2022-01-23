import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styled from 'styled-components';
import { useSong } from '../context/SongContext';

const PlayerContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;

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

function Player() {
    const { currentSong } = useSong();
    return (
        <PlayerContainer>
            <AudioPlayer
            autoPlay
            src={currentSong?.audio}
            onPlay={e => console.log("onPlay")}
            />
        </PlayerContainer>
    );
}

export default Player;
