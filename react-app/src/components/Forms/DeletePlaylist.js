import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePlaylist } from "../../store/playlists";
import FormContainer from "./FormContainer";

function DeletePlaylist({playlist, setShowModal}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const path = location.pathname;

    const [isWaiting, setIsWaiting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const pId = playlist.id;
        setIsWaiting(true);
        dispatch(deletePlaylist( playlist.id ))
          .then(() => setIsWaiting(false))
          .then(() => {
            setShowModal(false);
            if (path === `/playlists/${pId}`) history.push('/');
          });
    }

    const cancel = e => {
      e.preventDefault();
      setShowModal(false);
    }

    return (
        <FormContainer show={isWaiting}>
          <div id='form-title'>Delete Playlist</div>
          <div id='question-template'>Are you sure that you want to delete</div>
          <div id='title-holder'>'<div id='actual-title'>{playlist ? playlist.title : ''}</div>'</div>
          <form onSubmit={handleSubmit} id="delete-form">
              <div id='delete-button-container'>
                <button onClick={cancel}>Cancel</button>
                <button type="submit">Yes</button>
              </div>
          </form>
        </FormContainer>
    )
}

export default DeletePlaylist;
