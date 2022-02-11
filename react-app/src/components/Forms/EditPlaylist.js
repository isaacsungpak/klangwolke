import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editPlaylist } from "../../store/playlists";
import FormContainer from "./FormContainer";

function EditPlaylist({playlist, setShowModal}) {
    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState('');
    const [title, setTitle] = useState(playlist?.title);
    const [isWaiting, setIsWaiting] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsWaiting(true);
        dispatch(editPlaylist({ playlistId: playlist.id, title }))
          .then((res) => {
            setIsWaiting(false);
            if (res.error) setErrorMessage(res.payload[0]);
            else setShowModal(false);
          });
    }

    const updateTitle = (e) => {
      let errorMsg = '';
      const titleString = e.target.value;
      const trimmedTitle = titleString.replaceAll(/ |​/g, '');
      setTitle(titleString);

      if (titleString.length > 100) errorMsg ='Title length cannot exceed 100 characters';
      else if (trimmedTitle.length < 1) errorMsg = 'Title must contain at least 1 non-space character';

      setErrorMessage(errorMsg);
    }

    const cancel = e => {
      e.preventDefault();
      setShowModal(false);
    }

    return (
      <>
        <FormContainer show={isWaiting}>
          <div id='form-title'>Edit Playlist Title</div>
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
              <button type="submit" className={ (errorMessage !== '' || !title ) ? 'disabled' : ''} disabled={ errorMessage !== '' || !title || isWaiting }>Submit</button>
              <button onClick={cancel}>Cancel</button>
            </div>
          </form>
        </FormContainer>
      </>
    )
}

export default EditPlaylist;
