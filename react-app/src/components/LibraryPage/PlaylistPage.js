import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaylistSongs } from '../../store/songs';
import { getPlaylists } from '../../store/playlists';
import CreatePlaylistModal from '../Modals/CreatePlaylistModal';
import PlaylistTab from './PlaylistTab';

const PlaylistsPageContent = styled.div`
    margin: 0px 20px;
    flex: 1;
    display: flex;
    height: 100%;
`

const PlaylistsBar = styled.div`
    width: 346px;
    margin: 20px 0;
    margin-right: 20px;
    flex: 1;
    border: 2px groove #EEE;

    @media screen and (max-width: 1240px) {
        width: 296px;
    }

    @media screen and (max-width: 1000px) {
        width: 246px;
    }
`

const PlaylistsList = styled.div`
    width: 100%;
    height: 100%;
    flex: 1;
    overflow-y: auto;
`

const SongSection = styled.div`
    width: 799px;
    border-left: 1px solid #AAA;
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.selected === 0 ? 'center' : 'flex-start'};
    align-items: center;

    @media screen and (max-width: 1240px) {
        width: 609px;
    }

    @media screen and (max-width: 1000px) {
        width: 379px;
    }

    .playlist-title {
        font-size: 30px;
        font-weight: 700px;
        margin: 20px;
        color: black;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    #no-playlist {
        color: #DDD;
    }
`

const SongList = styled.div`
    display: flex;
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
            <PlaylistsBar>
                <CreatePlaylistModal />
                <PlaylistsList>
                    {playlistsLoaded && Object.values(playlists).map((playlist, ind) => {
                        <PlaylistTab playlist={playlist} focused={selectedPlaylistId === playlist.id} key={`pl${ind}`} />
                    })}
                </PlaylistsList>
            </PlaylistsBar>
            <SongSection selected={selectedPlaylistId}>
                <div className='playlist-title' id={selectedPlaylistId === 0 ? 'no-playlist' : ''}>
                    {selectedPlaylistId === 0 ? 'No playlist selected' : playlists[selectedPlaylistId].title}
                </div>
                <SongList>
                </SongList>
            </SongSection>
        </PlaylistsPageContent>
    )
}

export default PlaylistsPage;
