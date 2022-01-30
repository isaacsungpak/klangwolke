import CreatePlaylist from "./CreatePlaylist";
import AddToPlaylist from "./AddToPlaylist";
import styled from "styled-components";
import { useState } from "react";

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const FormBox = styled.div`
    filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.5));

    #tab-holder {
        display: flex;
        gap: 5px;
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

    #form-container {
        padding: 50px;
        border: 1px solid black;
        background-color: white;
        z-index: 2;
    }
`

function DoubleATPForm({songId, setShowModal}) {
    const [isAdd, setIsAdd] = useState(true);

    return (
        <Content>
            <FormBox>
                <div id="tab-holder">
                    <div className="tab" id={isAdd ? "active" : ""} onClick={() => setIsAdd(true)}><div>Add to Playlist</div></div>
                    <div className="tab" id={isAdd ? "" : "active"} onClick={() => setIsAdd(false)}><div>New Playlist</div></div>
                </div>
                {isAdd ?
                    <AddToPlaylist songId={songId} setShowModal={setShowModal} /> :
                    <CreatePlaylist songId={songId} setShowModal={setShowModal}/>
                }
            </FormBox>
        </Content>
    )
}

export default DoubleATPForm;
