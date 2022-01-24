import React, { useState } from "react";
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
        console.log(title, audio, image);
        dispatch(createSong({ title, audio, image }));
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
        if (!file) return alert("No audio file selected!");
        setAudio(file);
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        if (!file) return alert("No image file selected!");
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

// const UploadSong = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const [title, setTitle] = useState("");
//   const [audio, setAudio] = useState("");
//   const [image, setImage] = useState("");
//   const handleSubmit = async (e) => {
//       e.preventDefault();
//       dispatch(createSong(title)).then(() => history.push("/"));
//   }

//   const updateAudio = (e) => {
//       const audioFile = e.target.files[0];
//       if(!audioFile) return alert("No file selected.");
//       getSignedRequest(audioFile, 1);
//   }

//   const updateImage = (e) => {
//       const imageFile = e.target.files[0];
//       if(!imageFile) return alert("No file selected.");
//       getSignedRequest(imageFile, 2);
//   }

//   function getSignedRequest(file, type){
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", `/api/songs/sign_s3?file_name=${file.name}&file_type=${file.type}`);
//     xhr.onreadystatechange = function(){
//       if(xhr.readyState === 4){
//         if(xhr.status === 200){
//           const response = JSON.parse(xhr.responseText);
//           uploadFile(file, response.data, response.url, type);
//         }
//         else alert("Could not get signed URL.");
//       }
//     };
//     xhr.send();
//   }

//   function uploadFile(file, s3Data, url, type){
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", s3Data.url);
//     const postData = new FormData();
//     for(let key in s3Data.fields){
//       postData.append(key, s3Data.fields[key]);
//     }
//     postData.append('file', file);
//     xhr.onreadystatechange = function() {
//       if(xhr.readyState === 4){
//         if(xhr.status === 200 || xhr.status === 204){
//           alert("Success :)")
//           if (type === 1) setAudio(url);
//           else if (type === 2) setImage(url);
//         }
//         else alert("Could not upload file.");
//      }
//     };
//     xhr.send(postData);
//     // THUNK REQ TO BACKEND, INCLUDING URLS FOR FILES
//   }

//   return (
//       <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             onChange={e => setTitle(e.target.value)}
//             value={title}
//           />
//           <input
//             type="file"
//             accept="audio/*"
//             onChange={updateAudio}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={updateImage}
//           />
//           <button type="submit">Submit</button>
//       </form>
//   )
// }

export default UploadSong;
