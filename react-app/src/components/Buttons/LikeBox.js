import { useDispatch, useSelector } from "react-redux";
import { likeASong, unlikeASong } from "../../store/songs";
import RectangularButton from './RectangularButton';


function LikeBox({songId}) {
    const dispatch = useDispatch();

    const likes = useSelector(state => state.songs.entities.likes);
    const likeToggle = () => {
        if (!likes[songId]) dispatch(likeASong(songId));
        else dispatch(unlikeASong(songId));
    }

    return (
        <div onClick={likeToggle}>
            <RectangularButton>
                { likes[songId] ? "Unlike" : "Like" }
            </RectangularButton>
        </div>
    )
}

export default LikeBox;
