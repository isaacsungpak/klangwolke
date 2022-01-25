import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editSong } from "../../store/songs";
import styled from "styled-components";
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

  .bad-input {
    color: #FF002B;
  }

  #title-input {
    flex: 1;
    display: flex;
    margin: 20px;
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

function EditSong({song}) {
    const dispatch = useDispatch();
    // const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');
    const [title, setTitle] = useState(song.title);
    const [isWaiting, setIsWaiting] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsWaiting(true);
        dispatch(editSong({ songId: song.id, title }))
          .then(() => setIsWaiting(false))
        //   .then(() => history.push('/'))
        // close modal
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
      <>
        <SongFormContainer>
        <WaitingAnimation show={isWaiting} />
          <div id='form-title'>Edit Song Title</div>
          <form onSubmit={handleSubmit} id="upload-form">
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
              <button type="submit" className={ (errorMessage !== '' || !title ) ? 'disabled' : ''} disabled={ errorMessage !== '' || !title }>Submit</button>
              <button disabled={true}>Cancel</button>
            </div>
          </form>
        </SongFormContainer>
      </>
    )
}

export default EditSong;
