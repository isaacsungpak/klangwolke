import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getPlaylistSongs } from '../../store/songs';
import { getPlaylists } from '../../store/playlists';
import CreatePlaylistModal from '../Modals/CreatePlaylistModal';
import CardHolder from './CardHolder';
import PlaylistCard from './PlaylistCard';


function PlaylistsPage() {
    const dispatch = useDispatch();
    const [playlistsLoaded, setPlaylistsLoaded] = useState(false);

    const playlists = useSelector(state => state.playlists.playlists);

    useEffect(() => {
        dispatch(getPlaylists()).then(() => setPlaylistsLoaded(true));
    }, [dispatch]);

    return (
        <>
            <CardHolder>
                <CreatePlaylistModal />
                {playlistsLoaded && Object.values(playlists).sort((a, b) => (new Date(b.updatedAt) - new Date(a.updatedAt))).map((playlist, ind) => (
                    <PlaylistCard playlist={playlist} key={`pl${ind}`} />
                ))}
            </CardHolder>
        </>
    )
}

export default PlaylistsPage;
