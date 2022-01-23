import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from 'react-router-dom'
import styled from 'styled-components';
import { getUserHome, getGuestHome } from '../../store/songs';
import SongCard from '../SongCard';

const Home = styled.div`
`

const NewContainer = styled.div`
`

const useQuery = () => {
    const { pageParams } = useLocation();
    return React.useMemo(() => new URLSearchParams(pageParams), [pageParams]);
}

function HomePage() {
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const query = useQuery();

    //  for pagination:
    // const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false);

    const newPage = (query.get("new") || 1);
    const likesPage = (query.get("likes") || 1);

    useEffect(() => {
        if (user) dispatch(getUserHome({ newPage, likesPage })).then(() => setIsLoaded(true));
        else dispatch(getGuestHome({ newPage })).then(() => setIsLoaded(true));
    }, [dispatch, user, newPage, likesPage])

    const songs = useSelector(state => state.songs.entities.songs);
    const newSongs = useSelector(state => state.songs.entities.newSongs);
    const likedSongs = useSelector(state => state.songs.entities.likedSongs);

    // for pagination:
    // function setPage() {
    //     history.push
    // }

    return (
        <Home>
            <NewContainer>
                {isLoaded && newSongs.map(newSong =>
                    <SongCard song={songs[newSong]} key={`n.${newSong}`}/>
                )}
            </NewContainer>
        </Home>
    );
}

export default HomePage;
