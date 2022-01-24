import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSong } from "../../store/songs";

const UploadSong = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [audio, setAudio] = useState("");
    const [image, setImage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append("title", title);
        // formData.append("audio", audio);
        // formData.append("image", image);
        dispatch(createSong(title)).then(() => history.push("/"));
        // dispatch(createSong(formData));
    //     const res = await fetch(`http://localhost:5000/api/songs/`, {
    //       method: "POST",
    //       headers: { "Content-Type": "multipart/form-data" },
    //       body: formData
    //     });
    //     if (res.ok) history.push("/");
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
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
            {/* <input
              type="file"
              accept="audio/*"
              onChange={updateAudio}
            />
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            /> */}
            <button type="submit">Submit</button>
        </form>
    )
}

export default UploadSong;
