import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSong } from "../../store/songs";
import FormContainer from "./FormContainer";

function DeleteSong({song, showModal}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isWaiting, setIsWaiting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsWaiting(true);
        dispatch(deleteSong( song.id ))
          .then(() => setIsWaiting(false))
          .then(() => history.push('/'))
    }

    return (
      <>
        <FormContainer show={isWaiting}>
          <div id='form-title'>Delete Song</div>
          <div id='question-template'>Are you sure that you want to delete</div>
          <div id='title-holder'>'<div id='actual-title'>{song ? song.title : ''}</div>'</div>
          <form onSubmit={handleSubmit} id="delete-form">
            <div id='delete-button-container'>
              <button disabled={true}>Cancel</button>
              <button type="submit">Yes</button>
            </div>
          </form>
        </FormContainer>
      </>
    )
}

export default DeleteSong;
