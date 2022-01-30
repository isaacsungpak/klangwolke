import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSongs } from '../../store/songs';
import CardHolder from './CardHolder';
import SongCard from '../SongCard';

function YourSongsPage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const songs = useSelector(state => state.songs.entities.songs);

    useEffect(() => {
        dispatch(getUserSongs()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            {isLoaded &&
                (Object.keys(songs).length > 0 ?
                    <CardHolder>
                        {Object.values(songs).sort((a, b) => (b.id- a.id)).map((song, idx) => (
                            <SongCard song={song} key={idx}/>
                            ))}
                    </CardHolder> :
                    <div id='empty-message'><div>There's nothing here</div></div>
                )
            }
        </>
    )
}

export default YourSongsPage;
