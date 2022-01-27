import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getSongs } from "../store/songs";
import SongCard from "./SongCard";
import { useSelector, useDispatch } from "react-redux";


const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function SearchPage() {
    const [isLoaded, setIsLoaded] = useState(false);

    let query = useQuery();
    const searchKey = query.get("key");

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSongs(searchKey)).then(() => setIsLoaded(true));
    }, [dispatch, searchKey])

    const songs = useSelector(state => state.songs.entities.songs);

    return (
        <div>
            { isLoaded && Object.values(songs).map((song, ind) => (
                <SongCard song={song} />
            ))}
        </div>
    )
}

export default SearchPage;
