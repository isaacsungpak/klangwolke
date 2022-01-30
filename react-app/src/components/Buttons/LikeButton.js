import { useDispatch, useSelector } from "react-redux";
import { likeASong, unlikeASong } from "../../store/songs";
import styled from "styled-components";

const Like = styled.div`
    color: ${props => props.defColor};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        color: #FF002B;
    }
`

function LikeButton({songId, defColor = '#FFF'}) {
    const dispatch = useDispatch();

    const likes = useSelector(state => state.songs.entities.likes);
    const likeToggle = () => {
        if (!likes[songId]) dispatch(likeASong(songId));
        else dispatch(unlikeASong(songId));
    }

    return (
        <Like
            onClick={likeToggle}
            id="like"
            className='actions'
            defColor={defColor}
        >
            {likes[songId] ? <i className="fas fa-heart" /> : <i className="far fa-heart" />}
        </Like>
    )
}

export default LikeButton
