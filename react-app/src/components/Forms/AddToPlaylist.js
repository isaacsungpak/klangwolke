import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistsWithoutSong, addSongToPlaylist } from "../../store/playlists";
import styled from "styled-components";
import FormContainer from "./FormContainer";

const PlaylistSelection = styled.div`
    width: 80%;
    margin: 15px;
    margin-bottom: 20px;
    border: 2px solid #AAA;
    border-style: groove;
    height: 200px;
    overflow-y: auto;

  #playlist-option {
    padding: 10px;
    flex: 1;
    border-bottom: 1px solid #CCC;
    cursor: pointer;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  #playlist-option:hover {
    background-color: #407BA7;
    color: white;
  }
`

function AddToPlaylist({songId, setShowModal}) {
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false)
    const [isWaiting, setIsWaiting] = useState(false)

    useEffect(() => {
        dispatch(getPlaylistsWithoutSong(songId)).then(() => setIsLoaded(true));
    }, [dispatch, songId])

    const playlists = useSelector(state => state.playlists.auxPlaylists);

    const submit = async (playlistId) => {
        setIsWaiting(true);
        dispatch(addSongToPlaylist({songId, playlistId}))
          .then(() => setIsWaiting(false))
          .then(() => setShowModal(false));
    }

    const cancel = e => {
      e.preventDefault();
      setShowModal(false);
    }

    return (
      <FormContainer show={isWaiting} >
          <div id='form-title'>Add to Playlist</div>
          <div id='form-subheader'>(Only playlists that do not already contain the song are shown)</div>
          <PlaylistSelection>
              {isLoaded && Object.values(playlists).map((playlist, ind) => (
                  <div id='playlist-option' key={ind} onClick={() => submit(playlist.id)} value={playlist.id}>{playlist.title}</div>
              ))}
          </PlaylistSelection>
          <button onClick={cancel}>Cancel</button>
      </FormContainer>
    )
}

export default AddToPlaylist;
