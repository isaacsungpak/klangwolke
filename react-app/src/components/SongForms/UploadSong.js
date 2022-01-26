import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSong } from "../../store/songs";
import styled from "styled-components";
import FileDropzone from "./FileDropzone";
import WaitingAnimation from "../WaitingAnimation";

const SongFormContainer = styled.div`
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
    padding-bottom: 0;
    font-size: 25px;
    font-weight: 700;
  }

  form {
    width: 90%;
  }

  ul {
    list-style: none;
    padding: 0;
    color: #FF002B;
  }

  .bad-input {
    color: #FF002B;
  }

  .field {
    margin: 20px;
  }

  #title-input {
    flex: 1;
    display: flex;
    margin-top: 10px;
    flex-direction: column;
  }

  label {
    font-size: 14px;
  }

  #title-input > input {
    outline: none;
    border: none;
    border-bottom: 1px solid #AAA;
    font-size: 20px;
    width: 100%;
    font-family: 'Roboto Condensed', sans-serif;
    background-color: transparent;
  }

  #title-input > input:focus {
    border-bottom: 1px solid black;
  }

  #button-container {
    padding: 20px;
    padding-top: 0;
    padding-bottom: 30px;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
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

  .disabled {
    cursor: default;
    color: #CCC;
    border: 1px #CCC dashed;
  }

  button:not(.disabled):hover {
    box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.3);
  }
`

const UploadSong = () => {
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
        <SongFormContainer>
        <WaitingAnimation show={isWaiting} />
          <div id='form-title'>Upload</div>
          <form onSubmit={handleSubmit} id="upload-form">
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
        </SongFormContainer>
      </>
    )
}

export default UploadSong;
