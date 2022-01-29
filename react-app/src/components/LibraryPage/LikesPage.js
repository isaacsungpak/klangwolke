import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikedSongs } from '../../store/songs';
import CardHolder from './CardHolder';
import SongCard from '../SongCard';


function LikesPage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const songs = useSelector(state => state.songs.entities.songs);
    const likedSongs = useSelector(state => state.songs.entities.likedSongs);

    useEffect(() => {
        dispatch(getLikedSongs()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            <CardHolder>
                {isLoaded && likedSongs.map((songId, idx) => (
                    <SongCard song={songs[songId]} kei={idx}/>
                ))}
            </CardHolder>
        </>
    )
}

export default LikesPage;
