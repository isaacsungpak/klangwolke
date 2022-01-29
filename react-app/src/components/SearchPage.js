import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getSongs } from "../store/songs";
import SongCard from "./SongCard";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Page = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    #search-header {
        font-size: 36px;
        font-weight: 700;
        margin: 24px;
        margin-bottom: 0px;
    }

    #result-count {
        font-size: 14px;
        color: #AAA;
        width: 90%;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 4px;
    }
`
const Results = styled.div`
    width: 1080px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    justify-items: center;
    align-items: center;

    @media screen and (max-width: 1240px) {
        width: 740px;
        grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (max-width: 1000px) {
        width: 550px;
        grid-template-columns: repeat(3, 1fr);
    }

    padding-bottom: 20px;
`

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
        <Page>
            <div id='search-header'>Results for '{searchKey}'</div>
            <div id='result-count'>{Object.values(songs).length} results</div>
            <Results>
                {isLoaded && Object.values(songs).map((song, ind) => (
                    <SongCard song={song} key={ind}/>
                ))}
            </Results>
        </Page>
    )
}

export default SearchPage;
