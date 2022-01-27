import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import CreatePlaylist from "./Forms/CreatePlaylist";
import EditPlaylist from "./Forms/EditPlaylist";
import DeletePlaylist from "./Forms/DeletePlaylist";
import { useEffect, useState } from "react";
import { getPlaylists } from "../store/playlists";
import AddToPlaylist from "./Forms/AddToPlaylist";
import SongCard from "./SongCard";

const Playground = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex-wrap: wrap;
`

function SANDBOX() {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPlaylists()).then(() => setIsLoaded(true));
    },[dispatch])

    const songs = useSelector(state => state.songs.entities.songs);
    const playlists = useSelector(state => state.playlists.playlists);

    return (
        <Playground>
            {isLoaded &&
                <>
                    <CreatePlaylist song={songs[1]}/>
                    <EditPlaylist playlist={playlists[2]}/>
                    <DeletePlaylist playlist={playlists[7]}/>
                    <AddToPlaylist song={songs[2]}/>
                    <SongCard playlist={playlists[8]} song={songs[1]} />
                </>
            }
        </Playground>
    );
}

export default SANDBOX;
