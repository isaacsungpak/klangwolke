import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getASong, getComments } from "../../store/songs";
import Banner from "../Banner";
import styled from "styled-components";
import AddToPlaylistBox from "../Modals/AddToPlaylistBox";
import LikeBox from "../Buttons/LikeBox";
import EditSongBox from "../Modals/EditSongBox";
import DeleteSongBox from "../Modals/DeleteSongBox";
import Comment from "./Comment";
import CommentBox from "./CommentBox";

const Buttons = styled.div`
    height: min-content;
    flex: 1;
    display: flex;
    padding: 10px 15px;
    gap: 10px;
    border-bottom: 1px solid #CCC;
`

const NoComment = styled.div`
    flex: 1;
    height: min-content;
    padding: 16px 20px;
    display: flex;
    font-size: 20px;
    color: #BBB;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

function SongPage() {
    const {songId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState();

    const songs = useSelector(state => state.songs.entities.songs);
    const comments = useSelector(state => state.songs.entities.comments);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getASong(songId))
            .then((res) => {
                if (res.error) history.push('/');
            })
            .then(() => dispatch(getComments(songId)))
            .then(() => setIsLoaded(true));
    }, [dispatch, history, songId]);

    const orderedComments = Object.values(comments).sort((a,b) => b.id - a.id);

    return (
        <>
            {isLoaded &&
                <>
                    <Banner object={songs[songId]} />

                    { user &&
                        <>
                            <Buttons>
                                <LikeBox songId={songId} />
                                <AddToPlaylistBox song={songs[songId]} />
                                { user.id === songs[songId]?.owner.id &&
                                    <>
                                        <EditSongBox song={songs[songId]} />
                                        <DeleteSongBox song={songs[songId]} />
                                    </>
                                }
                            </Buttons>
                            <CommentBox songId={songId}/>
                        </>
                    }
                    { orderedComments.length > 0 ?
                        orderedComments.map((comment, idx) => (
                            <Comment
                                comment={comment}
                                date={comment.createdAt === comment.updatedAt ? new Date(comment.createdAt) : new Date(comment.updatedAt)}
                                key={idx}
                            />
                        )) :
                        <NoComment>No comments yet</NoComment>
                    }
                </>
            }
        </>
    )
}

export default SongPage;
