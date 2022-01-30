import { useSelector } from "react-redux";
import { useSong } from "../../context/SongContext";
import styled from "styled-components";

const Play = styled.div`
    transition: all 0.3s ease-in-out;
    color: ${props => props.isCurrent ? "#FF002B" : "#FFF"};

    &:hover {
        color: ${props => props.isCurrent ? "#FF002B" : "#407BA7"}
    }
`

function PlayButton({songId}) {
    const { currentSong, setCurrentSong, isPlaying, setIsPlaying, player} = useSong();
    const songs = useSelector(state => state.songs.entities.songs);

    const playToggle = () => {
        if (isPlaying) {
            if (currentSong.id === songId) {
                setIsPlaying(false);
                return player.current.audio.current.pause();
            } else return setCurrentSong(songs[songId]);
        } else {
            setIsPlaying(true);
            if (currentSong.id === songId) return player.current.audio.current.play();
            else return setCurrentSong(songs[songId]);
        }
    };

    return (
        <Play id="play" className='actions' onClick={playToggle} isCurrent={songId === currentSong.id}>
            {(songId === currentSong.id && isPlaying) ? <i className="fas fa-pause-circle" /> : <i className="fas fa-play-circle" />}
        </Play>
    )
}

export default PlayButton;
