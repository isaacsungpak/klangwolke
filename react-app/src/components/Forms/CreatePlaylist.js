import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlaylist } from "../../store/playlists";
import FormContainer from "./FormContainer";

function CreatePlaylist({songId, setShowModal}) {
    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState('');
    const [title, setTitle] = useState('');
    const [isWaiting, setIsWaiting] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsWaiting(true);
        dispatch(createPlaylist({ title, songId }))
          .then((res) => {
            setIsWaiting(false)
            if (res.error) setErrorMessage(res.payload);
            else setShowModal(false)
          });
    }

    const updateTitle = (e) => {
      const titleString = e.target.value;
      const trimmedTitle = titleString.replaceAll(/ |​/g, '');

      if (titleString.length > 100) setErrorMessage('Title length cannot exceed 100 characters');
      else if (trimmedTitle.length < 1) setErrorMessage('Title must contain at least 1 non-space character');
      else setErrorMessage('');

      setTitle(titleString);
    }

    const cancel = e => {
      e.preventDefault();
      setShowModal(false);
    }

    return (
      <FormContainer show={isWaiting}>
        <div id='form-title'>Create New Playlist</div>
        <form onSubmit={handleSubmit} id="edit-form">
          <div id="title-input" className="field">
            <label className={errorMessage !== '' ? 'bad-input' : ''}>{errorMessage || 'Title'}</label>
            <input
              type="text"
              name="title"
              onChange={updateTitle}
              value={title}
              className={errorMessage !== '' ? 'bad-input-field' : ''}
            />
          </div>
          <div id='button-container'>
            <button type="submit" className={ (errorMessage !== '' || !title ) ? 'disabled' : ''} disabled={ errorMessage !== '' || !title || isWaiting }>Create</button>
            <button onClick={cancel}>Cancel</button>
          </div>
        </form>
      </FormContainer>
    )
}

export default CreatePlaylist;
