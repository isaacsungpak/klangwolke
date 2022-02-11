import { useSong } from "../../context/SongContext";
import styled from "styled-components";

const Play = styled.div`
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

function PlayButton({songId}) {
    const { queue, setQueue, currentSong, setCurrentSong, isPlaying, setIsPlaying, player} = useSong();

    const playToggle = () => {
        if (isPlaying) {
            if (queue[currentSong] === songId) {
                setIsPlaying(false);
                return player.current.audio.current.pause();
            } else {
                setQueue([songId]);
                setCurrentSong(0);
            }
        } else {
            setIsPlaying(true);
            if (queue[currentSong] === songId) return player.current.audio.current.play();
            else  {
                setQueue([songId]);
                setCurrentSong(0);
            }
        }
    };

    return (
        <Play id="play" className='actions' onClick={playToggle} isCurrent={songId === queue[currentSong]}>
            {(songId === queue[currentSong] && isPlaying) ? <i className="fas fa-pause-circle" /> : <i className="fas fa-play-circle" />}
        </Play>
    )
}

export default PlayButton;
