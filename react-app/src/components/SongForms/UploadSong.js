import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSong } from "../../store/songs";
import styled from "styled-components";

const SongFormContainer = styled.div`
`

const UploadSong = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [errorMessages, setErrorMessages] = useState([]);
    const [title, setTitle] = useState("");
    const [audio, setAudio] = useState(null);
    const [image, setImage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = [];
        if (!audio) errors.push('Audio file is required.');
        if (!image) errors.push('Image file is required.');
        if (errors.length > 0) setErrorMessages(errors);

        dispatch(createSong({ title, audio, image }))
          .then(() => history.push('/'))
    }

    const updateTitle = (e) => {
      const titleString = e.target.value;
      const trimmedTitle = titleString.replaceAll(/ |​/g, '');
      setTitle(titleString);
      if (trimmedTitle.length < 1 || trimmedTitle.length > 100) setErrorMessages(['Title must consist of 1-40 non-space characters.']);
    }

    const updateAudio = (e) => {
        const file = e.target.files[0];
        setAudio(file);
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form onSubmit={handleSubmit} id="upload-form">
            <input
              type="text"
              name="title"
              onChange={updateTitle}
              value={title}
            />
            <input
              type="file"
              name="audio"
              accept=".mp3,.wav,.m4a"
              onChange={updateAudio}
            />
            <input
              type="file"
              name="image"
              accept=".gif,.jpg,.jpeg,.png"
              onChange={updateImage}
            />
            <button type="submit" disabled={ errorMessages.length > 0 || !audio || !image }>Submit</button>
        </form>
    )
}

export default UploadSong;
