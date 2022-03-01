import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistsWithoutSong, addSongToPlaylist } from "../../store/playlists";
import FormContainer from "./FormContainer";

function AddToPlaylist({songId, setShowModal}) {
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false)
    const [isWaiting, setIsWaiting] = useState(false)

    useEffect(() => {
        dispatch(getPlaylistsWithoutSong(songId)).then(() => setIsLoaded(true));
    }, [dispatch, songId])

    const playlists = useSelector(state => state.playlists.auxPlaylists);

    const submit = async (e) => {
        setIsWaiting(true);
        const playlistId = e.target.value;
        dispatch(addSongToPlaylist({songId, playlistId}))
          .then(() => setIsWaiting(false))
          .then(() => setShowModal(false));
    }

    const cancel = e => {
      e.preventDefault();
      setShowModal(false);
    }

    const organizedPlaylists = Object.values(playlists).sort((a, b) => a.title.localeCompare(b.title));

    return (
      <FormContainer show={isWaiting} >
          <div id='form-title'>Add to Playlist</div>
          <div id='form-subheader'>(Only playlists that do not already contain this song are shown)</div>
          <select
              defaultValue={0}
              onChange={submit}
          >
              <option
                  value={0}
                  disabled
              >
                  Select a playlist
              </option>
              {
                  isLoaded &&
                  organizedPlaylists.map(playlist => (
                      <option value={playlist.id} key={`playlist ${playlist.id}`}>
                          {playlist.title}
                      </option>
                  ))
              }
          </select>
          <button onClick={cancel}>Cancel</button>
      </FormContainer>
    )
}

export default AddToPlaylist;
