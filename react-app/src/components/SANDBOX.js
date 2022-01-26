import { useSelector } from "react-redux";
import DeleteSong from "./SongForms/DeleteSong";
import EditSong from "./SongForms/EditSong";
import styled from "styled-components";

const Playground = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex-wrap: wrap;
`

function SANDBOX() {
    const songs = useSelector(state => state.songs.entities.songs);
    return (
        <Playground>
            <EditSong song={songs[1]}/>
            <DeleteSong song={songs[1]}/>
        </Playground>
    );
}

export default SANDBOX;
