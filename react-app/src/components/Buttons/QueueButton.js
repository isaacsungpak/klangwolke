import { useSelector } from "react-redux";
import { useSong } from "../../context/SongContext";
import styled from "styled-components";

const Queue = styled.div`
    visibility: ${props => props.isInQueue ? "hidden" : "visible"};
    display: flex;
    justify-content: center;
    align-items: center;

    transition: all 0.3s ease-in-out;
    color: #FFF;
    cursor: pointer;

    &:hover {
        color: #407BA7;
    }
`

function QueueButton({songId}) {
    const { queue, setQueue } = useSong();
    const songs = useSelector(state => state.songs.entities.songs);

    const isInQueue = queue.indexOf(songs[songId]) !== -1;

    const addToQueue = () => {
        const newQueue = queue.concat(songs[songId]);
        setQueue(newQueue);
    };

    return (
        <Queue id="queue" className='actions' onClick={addToQueue} isInQueue={isInQueue}>
            <i className="fas fa-plus"/>
        </Queue>
    )
}

export default QueueButton;
