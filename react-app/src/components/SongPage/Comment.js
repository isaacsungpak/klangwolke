import { useSelector } from "react-redux";
import styled from "styled-components";
import DeleteCommentBox from "../Modals/DeleteCommentBox";
import EditCommentBox from "../Modals/EditCommentBox";

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
    color: black;
    font-size: 16px;

    white-space: wrap;
    overflow-wrap: break-word;
`

const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
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
                <Buttons>
                    <EditCommentBox comment={comment}/>
                    <DeleteCommentBox commentId={comment.id} />
                </Buttons>
            }
        </Container>
    );
}

export default Comment;
