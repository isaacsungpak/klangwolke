import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import WaitingAnimation from "../WaitingAnimation";
import { deletePlaylist } from "../../store/playlists";

const PlaylistFormContainer = styled.div`
  margin-top: 20px;
  width: 450px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.5);

  #form-title {
    padding: 30px;
    padding-bottom: 10px;
    font-size: 25px;
    font-weight: 700;
  }

  #playlist-title {
    width: 80%;
    text-align: center;
    padding-bottom: 10px;
    font-size: 18px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: none;
  }

  #title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  form {
    width: 90%;
  }

  #button-container {
    padding: 20px;
    padding-top: 0;
    padding-bottom: 30px;
    display: flex;
    justify-content: space-between;
  }

  button {
    font-family: 'Roboto Condensed', sans-serif;
    color: black;
    outline: none;
    border: 1px black solid;
    background-color: white;
    font-size: 16px;
    font-weight: 500;
    padding: 7px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  button:hover {
    box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.3);
  }
`

function DeletePlaylist({playlist}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isWaiting, setIsWaiting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsWaiting(true);
        dispatch(deletePlaylist( playlist.id ))
            .then(() => history.push('/'))
            .then(() => setIsWaiting(false))
    }

    return (
        <PlaylistFormContainer>
            <WaitingAnimation show={isWaiting} />
            <div id='form-title'>Delete Song</div>
            <div id='question-template'>Are you sure that you want to delete</div>
            <div id='playlist-title'>'<div id='title'>{playlist ? playlist.title : ''}</div>'</div>
            <form onSubmit={handleSubmit} id="delete-form">
                <div id='button-container'>
                <button disabled={true}>Cancel</button>
                <button type="submit">Yes</button>
                </div>
            </form>
        </PlaylistFormContainer>
    )
}

export default DeletePlaylist;
