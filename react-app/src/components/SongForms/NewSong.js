import React, {useState} from "react";
import { useHistory } from "react-router-dom";

const UploadPicture = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [title, setTitle] = useState("");
    const [audio, setAudio] = useState(null);
    const [image, setImage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("audio", audio);
        formData.append("image", image);

        setImageLoading(true);
        const res = await fetch('/api/songs', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            history.push("/");
        }
        else {
            console.log("error")
        }
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
            <input
              type="file"
              accept="audio/*"
              onChange={updateAudio}
            />
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default UploadPicture;
