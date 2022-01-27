import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSong } from "../../store/songs";
import FileDropzone from "./FileDropzone";
import FormContainer from "./FormContainer";

const UploadSong = (showModal) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [errorMessages, setErrorMessages] = useState({});
    const [title, setTitle] = useState("");
    const [audio, setAudio] = useState(null);
    const [image, setImage] = useState(null);
    const [isWaiting, setIsWaiting] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMsgs = {};
        if (!audio) errorMsgs.audio = 'Audio file is required';
        if (!image) errorMsgs.image = 'Image file is required';

        if (Object.values(errorMsgs).length > 0) return setErrorMessages(errorMsgs);;

        setIsWaiting(true);
        dispatch(createSong({ title, audio, image }))
          .then(() => setIsWaiting(false))
          .then(() => history.push('/'))
    }

    const updateTitle = (e) => {
      const errorMsgs = {};
      const titleString = e.target.value;
      const trimmedTitle = titleString.replaceAll(/ |​/g, '');
      setTitle(titleString);

      if (trimmedTitle.length < 1) errorMsgs.title = 'Title must contain at least 1 non-space character';
      else if (titleString.length > 100) errorMsgs.title ='Title length cannot exceed 100 characters';

      setErrorMessages(errorMsgs);
    }

    return (
      <>
        <FormContainer show={isWaiting}>
          <div id='form-title'>Upload</div>
          <form onSubmit={handleSubmit}>
            <div id="title-input" className="field">
              <label className={errorMessages.title ? 'bad-input' : ''}>{errorMessages.title || 'Title'}</label>
              <input
                type="text"
                name="title"
                onChange={updateTitle}
                value={title}
              />
            </div>
            {errorMessages.audio && <div className='bad-input'>{errorMessages.audio}</div>}
            <FileDropzone id="audio-drop" className="field" fileSetter={setAudio} type='audio' formats='audio/mpeg, audio/wav, audio/ogg' />
            {errorMessages.image && <div className='bad-input'>{errorMessages.image}</div>}
            <FileDropzone id="image-drop" className="field" fileSetter={setImage} type='image' formats='image/jpeg, image/jpg, image/png, image/gif' />
            <div id='button-container'>
              <button type="submit" className={(title.length > 100 || !title || !audio || !image) ? 'disabled' : ''} disabled={title.length > 100 || !title || !audio || !image }>Upload</button>
              <button disabled={true}>Cancel</button>
            </div>
          </form>
        </FormContainer>
      </>
    )
}

export default UploadSong;
