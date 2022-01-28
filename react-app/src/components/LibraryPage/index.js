import styled from 'styled-components';
import { useState } from 'react';
import PlaylistsPage from './PlaylistPage';

const Page = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    #library-header {
        font-size: 36px;
        font-weight: 700;
        margin: 24px;
        margin-bottom: 18px;
    }
`

const LibraryNav = styled.div`
    width: 100%;
    border-bottom: 1px solid black;
    z-index: 2;

    #tab-holder {
        display: flex;
        margin-left: 40px;
        gap: 10px;
    }

    .tab {
        color: white;
        background-color: #333;
        border: 1px solid black;
        border-bottom: 0px solid white;
        margin-bottom: -1px;
        font-size: 18px;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        height: 45px;
        z-index: 1;
    }

    #active {
        background-color: white;
        font-size: 20px;
        color: black;
        z-index: 3;
        cursor: default;
    }
`

const LibraryContent = styled.div`
    flex: 1;
`

function LibraryPage() {
    const [tab, setTab] = useState(1);


    function changeToPlaylists() {
        setTab(1);
    }

    function changeToLikes() {
        setTab(2);
    }

    function changeToYourSongs() {
        setTab(3);
    }

    return (
        <Page>
            <div id='library-header'>Library</div>
            <LibraryNav>
                <div id='tab-holder'>
                    <div className='tab' id={tab === 1 ? 'active' : 0} onClick={changeToPlaylists}>Playlists</div>
                    <div className='tab' id={tab === 2 ? 'active' : 0} onClick={changeToLikes}>Likes</div>
                    <div className='tab' id={tab === 3 ? 'active' : 0} onClick={changeToYourSongs}>Your songs</div>
                </div>
            </LibraryNav>
            <LibraryContent>
                {tab === 1 &&
                    <PlaylistsPage />
                }
                {/* {tab === 2 &&
                    <LikedSongsPage />
                }
                {tab === 3 &&
                    <YourSongsPage />
                } */}
            </LibraryContent>
        </Page>
    )
}

export default LibraryPage;
