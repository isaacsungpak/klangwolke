import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getASong } from "../../store/songs";
import Banner from "../Banner";
import styled from "styled-components";
import AddToPlaylistBox from "../Modals/AddToPlaylistBox";
import LikeBox from "../Buttons/LikeBox";
import EditSongBox from "../Modals/EditSongBox";
import DeleteSongBox from "../Modals/DeleteSongBox";

const Buttons = styled.div`
    height: min-content;
    flex: 1;
    display: flex;
    padding: 10px 15px;
    gap: 10px;
    border-bottom: 1px solid #CCC;
`

function SongPage() {
    const {songId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState();

    const songs = useSelector(state => state.songs.entities.songs);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getASong(songId))
            .then((res) => {
                if (res.error) history.push('/');
            })
            .then(() => setIsLoaded(true));
    }, [dispatch, history, songId]);

    return (
        <>
            {isLoaded &&
                <>
                    <Banner object={songs[songId]} />
                    { user &&
                        <Buttons>
                            { user.id === songs[songId]?.owner.id &&
                                <>
                                    <EditSongBox song={songs[songId]} />
                                    <DeleteSongBox song={songs[songId]} />
                                </>
                            }
                            <AddToPlaylistBox song={songs[songId]} />
                            <LikeBox songId={songId} />
                        </Buttons>
                    }
                </>
            }
        </>
    )
}

export default SongPage;
