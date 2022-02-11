import styled from "styled-components";
import PlayButton from "./Buttons/PlayButton";
import PlaylistPlayButton from "./Buttons/PlaylistPlayButton";

const ImageBanner = styled.div`
    width: 100%;
    height: 380px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    overflow: hidden;

    #background {
        height: 110%;
        width: 110%;
        grid-column: 1;
        grid-row: 1;
        z-index: 1;
        background-color: #AAA;
        background-image: url(${props => props.image});
        margin: -10px -10px -10px -10px;
        filter: blur(6px);
        background-size: cover;
        background-position: center;
    }

    #frosting {
        height: 100%;
        width: 100%;
        grid-column: 1;
        grid-row: 1;
        z-index: 2;
        background-color: rgba(50, 50, 50, 0.5);
        display: grid;
        grid-template-columns: 5px 80px 1fr 340px 5px;
        grid-template-rows: 5px 1fr 40px 30px 1fr 5px;
        gap: 10px;
    }

    .text {
        background-color: black;
        color: white;
        padding: 5px;
        width: fit-content;
        max-width: 810px;
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (max-width: 1240px) {
            max-width: 580px;
        }

        @media screen and (max-width: 1000px) {
            max-width: 300px;
        }
    }

    .inner-text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    #playlist-play, #play {
        grid-column: 2;
        grid-row: 3/5;
        font-size: 80px;
        color: #FFF;
        transition: all 0.3s ease-in-out;
    }

    #playlist-play:hover, #play:hover {
        color: #407BA7;
        filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.1));
    }

    #title {
        font-size: 30px;
        grid-column: 3;
        grid-row: 3;
    }

    #owner {
        font-size: 20px;
        grid-column: 3;
        grid-row: 4;
    }

    #image {
        height: 100%;
        width: 100%;
        aspect-ratio: 1;
        grid-column: 4;
        grid-row: 2/6;
        background-color: #AAA;
        background-image: url(${props => props.image});
        background-size: cover;
        background-position: center;
    }

    #detail {
        font-size: 20px;
        grid-column: 2;
        grid-row: 5;
    }
`

function Banner({object}) {
    return (
        <>
            {object &&
                <ImageBanner image={object.image}>
                    <div id='background'/>
                    <div id="frosting">
                        { object.songCount !== undefined ?
                            <PlaylistPlayButton songs={object.songs} />:
                            <PlayButton songId={object.id} />
                        }
                        <div className='text' id='title'><div className="inner-text">{object.title}</div></div>
                        <div className='text' id='owner'><div className="inner-text">{object.owner.username}</div></div>
                        <div id='image' />
                        {/* <div className='text' id='detail'>
                            {object.songCount !== undefined ?
                                (object.songCount === 1 ? `1 song` : `${object.songCount} songs`) :
                                (object.likeCount === 1 ? `1 like` : `${object.likeCount} likes`)}
                        </div> */}
                    </div>
                </ImageBanner>
            }
        </>
    )
}

export default Banner;
