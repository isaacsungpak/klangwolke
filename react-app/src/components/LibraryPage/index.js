import styled from 'styled-components';
import { useState } from 'react';

const Page = styled.div`
    width: 100%;
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
`

function LibraryPage() {
    const [tab, setTab] = useState(1);


    function changeToPlaylists() {
        setTab(1);
    }

    function changeToLikes() {
        setTab(2);
    }

    function changeToYours() {
        setTab(3);
    }

    return (
        <Page>
            <div id='library-header'>Library</div>
            <LibraryNav>

            </LibraryNav>
        </Page>
    )
}

export default LibraryPage;
