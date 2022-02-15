import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getASong } from "../../store/songs";
import Banner from "../Banner";
import styled from "styled-components";
import AddToPlaylistBox from "../Modals/AddToPlaylistBox";

const Buttons = styled.div`
    height: min-content;
    flex: 1;
    display: flex;
    padding: 10px 15px;
    gap: 10px;
    border-bottom: 1px solid #CCC;
`

function SongPage() {
    const {songId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState();

    const songs = useSelector(state => state.songs.entities.songs);

    useEffect(() => {
        dispatch(getASong(songId))
            .then((res) => {
                if (res.error) history.push('/');
            })
            .then(() => setIsLoaded(true));
    }, [dispatch, history, songId]);

    return (
        <>
            {isLoaded &&
                <>
                    <Banner object={songs[songId]} />
                    <Buttons>
                        {/* <EditPlaylistBox playlist={playlists[playlistId]}/>
                        <DeletePlaylistBox playlist={playlists[playlistId]}/> */}
                        <AddToPlaylistBox song={songs[songId]} />
                    </Buttons>
                </>
            }
        </>
    )
}

export default SongPage;
