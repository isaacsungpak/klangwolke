import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getPlaylist } from "../../store/playlists";
import { getPlaylistSongs } from "../../store/songs";
import Banner from "../Banner";
import SongTab from "./SongTab";

function PlaylistPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { playlistId } = useParams();
    const [isLoaded, setIsLoaded] = useState();

    const playlists = useSelector(state => state.playlists.playlists);
    const songs = useSelector(state => state.songs.entities.songs);

    useEffect(() => {
        dispatch(getPlaylist(playlistId))
            .then((res) => {
                if (res.error) history.push('/library');
            })
            .then(() => dispatch(getPlaylistSongs(playlistId)))
            .then(() => setIsLoaded(true));
    }, [dispatch, history, playlistId]);

    return (
        <>
            {isLoaded &&
                <>
                    <Banner object={playlists[playlistId]} />
                    {playlists[playlistId].songs.length > 0 && playlists[playlistId].songs.map((songId, idx) => (
                        <SongTab num={idx + 1} song={songs[songId]} playlistId={playlistId}/>
                    ))}
                </>
            }
        </>
    )
}

export default PlaylistPage;
