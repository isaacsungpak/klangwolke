import { useDispatch } from "react-redux";
import { removeSongFromPlaylist } from "../../store/songs";
import styled from "styled-components";

const RFP = styled.div`
    color: ${props => props.defColor};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        color: #FF002B;
    }
`

function RFPButton({songId, playlistId, defColor = '#FFF'}) {
    const dispatch = useDispatch();

    const removeFromPlaylist = () => {
        dispatch(removeSongFromPlaylist({songId, playlistId}))
    }

    return (
        <RFP
            onClick={removeFromPlaylist}
            id="like"
            className='actions'
            defColor={defColor}
        >
            <i className="fas fa-times" />
        </RFP>
    )
}

export default RFPButton;
