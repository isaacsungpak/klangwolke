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
    const { queue, setQueue, currentSong } = useSong();

    const isInQueue = queue.indexOf(songId) !== -1;

    const addToQueue = () => {
        let newQueue;
        if (queue[currentSong] === 0) newQueue = [songId];
        else newQueue = queue.concat(songId);
        setQueue(newQueue);
    };

    return (
        <Queue id="queue" className='actions' onClick={addToQueue} isInQueue={isInQueue}>
            <i className="fas fa-plus"/>
        </Queue>
    )
}

export default QueueButton;
