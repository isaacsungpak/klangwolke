import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
    flex: 1;
    height: min-content;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #CCC;
`

const InfoBar = styled.div`
    width: 100%;
    height: min-content;
    display: flex;
    justify-content: space-between;
    color: #AAA;
    font-size: 14px;
    margin-bottom: 10px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`
const CommentContent = styled.div`
    width: 100%;
    height: min-content;
    display: flex;
    color: black;
    font-size: 16px;
`

function Comment({comment, date}) {
    const user = useSelector(state => state.session.user);

    return (
        <Container>
            <InfoBar>
                <div>{comment.user.username}</div>
                <div>
                    { comment.createdAt === comment.updatedAt ?
                        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` :
                        `(Edited) ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
                    }
                </div>
            </InfoBar>
            <CommentContent>
                {comment.content}
            </CommentContent>
            { (user && user.id === comment.userId) &&
                <>
                {/* edit and delete buttons for comment */}
                </>
            }
        </Container>
    );
}

export default Comment;
