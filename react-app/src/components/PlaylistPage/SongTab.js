import styled from "styled-components";
import { useState } from "react";
import { useSong } from "../../context/SongContext";
import PlayButton from "../Buttons/PlayButton";
import LikeButton from "../Buttons/LikeButton";

const Tab = styled.div`
    width: 100%;
    height: 30px;
    background-color: white;
    display: grid;
    grid-template-columns: 5px 30px 50px 1fr 5px;
    grid-template-rows: 1fr;
    gap: 10px;
    padding: 7px 0px;
    border-bottom: 1px solid #CCC;
    font-size: 16px;
    color: #AAA;

    &:hover {
        background-color: #EEE;
    }

    #image {
        grid-column: 2;
        grid-row: 1;
        background-image: url(${props => props.image});
        background-size: cover;
        background-position: center;
        width: 100%;
        aspect-ratio: 1;
    }

    #image-overlay {
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0%;
    }

    #play {
        font-size: 20px;
        transition: all 0.3s ease-in-out;

        filter: drop-shadow(0px 0px 4px black);
    }

    &:hover #image-overlay{
        opacity: 100%;
    }

    #index {
        grid-column: 3;
        grid-row: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #bar-body {
        grid-column: 4;
        grid-row: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        max-width: ${props => props.isHover ? '950px' : '1100px'};

        @media screen and (max-width: 1240px) {
            max-width: ${props => props.isHover ? '700px' : '850px'};
        }
        @media screen and (max-width: 1000px) {
            max-width: ${props => props.isHover ? '425px' : '575px'};
        }
    }

    #owner {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    #hyphen {
        margin: 0px 10px;
    }

    #title {
        color: ${props => props.isPlaying ? '#407BA7' : 'black'};
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    #overlay {
        grid-column: 1/4;
        grid-row: 1;
        z-index: 3;
        position: relative;

        height: 100%;
        width: 100%;

        background-color: rgba(0, 0, 0, 0.7);
        opacity: 0%;

        transition: all 0.3s ease-in-out;

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
        gap: 20px;
    }
`

function SongTab({num, song, playlistId}) {
    const { currentSong } = useSong();
    const [isHover, setIsHover] = useState(false)

    return (
        <Tab
            image={song.image}
            isPlaying={currentSong.id === song.id}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            isHover={isHover}
        >
            <div id='image'>
                <div id='image-overlay'>
                    <PlayButton songId={song.id} />
                </div>
            </div>
            <div id='index'><div>{num}</div></div>
            <div id='bar-body'>
                <div id='info'>
                    <span id='owner'>{song.owner.username}</span>
                    <span id='hyphen'>-</span>
                    <span id='title'>{song.title}</span>
                </div>
                {isHover &&
                    <div id='button-holder'>
                        <LikeButton
                            songId={song.id}
                            defColor={'black'}
                        />
                    </div>
                }
            </div>
        </Tab>
    )
}

export default SongTab;
