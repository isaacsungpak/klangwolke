import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaylistSongs } from '../../store/songs';
import { getPlaylists } from '../../store/playlists';

const PlaylistsPageContent = styled.div`

`

function PlaylistsPage() {
    const dispatch = useDispatch();
    const [playlistsLoaded, setPlaylistsLoaded] = useState(false);
    const [songsLoaded, setSongsLoaded] = useState(false);

    const playlists = useSelector(state => state.playlists.playlists);
    const songs = useSelector(state => state.songs.entities.songs);

    const [selectedPlaylistId, setSelectedPlaylistId] = useState(0);

    function selectPlaylist(id) {
        setSongsLoaded(false);
        setSelectedPlaylistId(id);
    }

    useEffect(() => {
        dispatch(getPlaylists()).then(() => setPlaylistsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getPlaylistSongs(selectedPlaylistId)).then(() => setSongsLoaded(true));
    }, [dispatch, selectedPlaylistId])

    return (
        <PlaylistsPageContent>
        </PlaylistsPageContent>
    )
}

export default PlaylistsPage;
