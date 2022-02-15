import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSong } from "../../store/songs";
import FormContainer from "./FormContainer";
import { useLocation, useHistory } from "react-router-dom";

function DeleteSong({song, setShowModal}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const path = location.pathname;

    const [isWaiting, setIsWaiting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsWaiting(true);
        dispatch(deleteSong(song.id))
          .then(() => setIsWaiting(false))
          .then(() => {
            setShowModal(false);
            if (path === `/songs/${song.id}`) history.push('/');
          });
    }

    const cancel = e => {
      e.preventDefault();
      setShowModal(false);
    }

    return (
      <>
        <FormContainer show={isWaiting}>
          <div id='form-title'>Delete Song</div>
          <div id='question-template'>Are you sure that you want to delete</div>
          <div id='title-holder'>'<div id='actual-title'>{song ? song.title : ''}</div>'</div>
          <form onSubmit={handleSubmit} id="delete-form">
            <div id='delete-button-container'>
              <button onClick={cancel}>Cancel</button>
              <button type="submit" disabled={ isWaiting }>Yes</button>
            </div>
          </form>
        </FormContainer>
      </>
    )
}

export default DeleteSong;
