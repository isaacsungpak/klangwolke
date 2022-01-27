import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import DeleteSong from "./Forms/DeleteSong";
import EditSong from "./Forms/EditSong";

import CreatePlaylist from "./Forms/CreatePlaylist";
import EditPlaylist from "./Forms/EditPlaylist";
import DeletePlaylist from "./Forms/DeletePlaylist";
import { useEffect, useState } from "react";
import { getPlaylists } from "../store/playlists";
import AddToPlaylist from "./Forms/AddToPlaylist";

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
                    <EditSong song={songs[1]}/>
                    <DeleteSong song={songs[1]}/>

                    <CreatePlaylist song={songs[1]}/>
                    <EditPlaylist playlist={playlists[2]}/>
                    <DeletePlaylist playlist={playlists[7]}/>
                    <AddToPlaylist song={songs[3]}/>
                </>
            }
        </Playground>
    );
}

export default SANDBOX;
