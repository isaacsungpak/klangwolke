import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSong } from "../../store/songs";
import FormData from 'form-data';

const UploadSong = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [audio, setAudio] = useState(null);
    const [image, setImage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createSong({ title, audio, image }));
    }

    const updateAudio = (e) => {
        const file = e.target.files[0];
        if (!file) return alert("No audio file selected.");
        setAudio(file);
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        if (!file) return alert("No image file selected.");
        setImage(file);
    }

    return (
        <form onSubmit={handleSubmit} id="upload-form">
            <input
              type="text"
              name="title"
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
            <input
              type="file"
              name="audio"
              accept="audio/*"
              onChange={updateAudio}
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={updateImage}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default UploadSong;
