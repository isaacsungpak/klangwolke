import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { getUserHome, getGuestHome } from '../../store/songs';
import SongCard from '../SongCard';
import CardHolder from '../LibraryPage/CardHolder';

const Home = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .home-title {
        width: 100%;
        padding-left: 130px;
        font-size: 36px;
        font-weight: 700;
    }

    #empty-message {
        width: 100%;
        padding-left: 130px;
        padding-top: 30px;
        color: #CCC;
        font-size: 20px;
    }
`

const useQuery = () => {
    const { pageParams } = useLocation();
    return React.useMemo(() => new URLSearchParams(pageParams), [pageParams]);
}

function HomePage() {
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const query = useQuery();

    const [isLoaded, setIsLoaded] = useState(false);

    const newPage = (query.get("new") || 1);
    const likesPage = (query.get("likes") || 1);

    useEffect(() => {
        if (user) dispatch(getUserHome({ newPage, likesPage })).then(() => setIsLoaded(true));
        else dispatch(getGuestHome({ newPage })).then(() => setIsLoaded(true));
    }, [dispatch, user, newPage, likesPage, isLoaded])

    const songs = useSelector(state => state.songs.entities.songs);
    const newSongs = useSelector(state => state.songs.entities.newSongs);
    const likedSongs = useSelector(state => state.songs.entities.likedSongs);

    return (
        <Home>
            {isLoaded &&
                <>
                    <div className='home-title'>New</div>
                        <CardHolder>
                            {newSongs.map((newSong, idx) =>
                                <SongCard song={songs[newSong]} key={`n.${idx}`}/>
                            )}
                        </CardHolder>
                    {user &&
                        <>
                            <br />
                            <br />
                            <div className='home-title'>Recently Liked</div>
                            {likedSongs.length > 0 ?
                                <CardHolder>
                                    {likedSongs.map((likedSong, idx) =>
                                        <SongCard song={songs[likedSong]} key={`rl.${idx}`}/>
                                    )}
                                </CardHolder>:
                                <div id='empty-message'><div>There's nothing here</div></div>
                            }
                        </>
                    }
                </>
            }
        </Home>
    );
}

export default HomePage;
