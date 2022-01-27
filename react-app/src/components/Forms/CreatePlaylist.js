import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlaylist } from "../../store/playlists";
import FormContainer from "./FormContainer";

function CreatePlaylist({song, showModal}) {
    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState('');
    const [title, setTitle] = useState('');
    const [isWaiting, setIsWaiting] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsWaiting(true);
        dispatch(createPlaylist({ title, songId: song.id }))
          .then(() => setIsWaiting(false))
    }

    const updateTitle = (e) => {
      let errorMsg = '';
      const titleString = e.target.value;
      const trimmedTitle = titleString.replaceAll(/ |​/g, '');
      setTitle(titleString);

      if (trimmedTitle.length < 1) errorMsg = 'Title must contain at least 1 non-space character';
      else if (titleString.length > 100) errorMsg ='Title length cannot exceed 100 characters';

      setErrorMessage(errorMsg);
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
            />
          </div>
          <div id='button-container'>
            <button type="submit" className={ (errorMessage !== '' || !title ) ? 'disabled' : ''} disabled={ errorMessage !== '' || !title }>Create</button>
            <button disabled={true}>Cancel</button>
          </div>
        </form>
      </FormContainer>
    )
}

export default CreatePlaylist;
