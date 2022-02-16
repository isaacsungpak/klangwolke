import { useSong } from "../../context/SongContext";
import styled from "styled-components";

const PlaylistPlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    color: ${props => props.isCurrent ? "#FF002B" : "#FFF"};
    cursor: pointer;

    &:hover {
        color: ${props => props.isCurrent ? "#FF002B" : "#407BA7"}
    }
`

function PlaylistPlayButton({songs, disabled=false}) {
    const { queue, setQueue, setCurrentSong, isPlaying, setIsPlaying, player } = useSong();

    function queueIsPlaylist() {
        if (queue.length !== songs.length) return false;
        else {
            songs.forEach((songId, idx) => {
                if (songId !== queue[idx]) return false;
            })
            return true;
        }
    }

    const playlistToggle = () => {
        if (!disabled) {
            if (isPlaying) {
                if (queueIsPlaylist()) {
                    setIsPlaying(false);
                    return player.current.audio.current.pause();
                } else {
                    setQueue(songs);
                    setCurrentSong(0);
                }
            } else {
                setIsPlaying(true);
                if (queueIsPlaylist()) return player.current.audio.current.play();
                else  {
                    setQueue(songs);
                    setCurrentSong(0);
                }
            }
        }
    };

    return (
        <PlaylistPlay id="playlist-play" className='actions' onClick={playlistToggle} isCurrent={queueIsPlaylist()}>
            {(queueIsPlaylist() && isPlaying) ? <i className="fas fa-pause-circle" /> : <i className="fas fa-play-circle" />}
        </PlaylistPlay>
    )
}

export default PlaylistPlayButton;
