import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { createComment } from "../../store/songs";

const Container = styled.div`
    height: min-content;
    flex: 1;
    border-bottom: 1px solid #CCC;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;

    textarea {
        width: 100%;
        height: 50px;
        resize: none;
        border-radius: 0;
        border: 1px solid #CCC;
        outline: none;
        font-family: 'Roboto Condensed', sans-serif;
        font-size: 16px;

        ::placeholder {
            color: #BBB;
        }
    }

    button {
        font-family: 'Roboto Condensed', sans-serif;
        color: black;
        outline: none;
        border: 1px black solid;
        background-color: white;
        font-size: 16px;
        font-weight: 500;
        padding: 7px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        &:not(:disabled):hover {
            box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.3);
        }

        &:disabled {
            cursor: default;
            color: #CCC;
            border: 1px #CCC dashed;
        }
    }
`
const Buttons = styled.div`
    width: 100%;
    height: min-content;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
`

function CommentBox({songId}) {
    const dispatch = useDispatch();

    const [content, setContent] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [showSubmit, setShowSubmit] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsWaiting(true);
        dispatch(createComment({ songId, content }))
            .then(() => {
                setContent("");
                setIsValid(false);
                setIsWaiting(false);
            });
    }

    const cancel = (e) => {
        e.preventDefault();
        setContent("");
        setIsValid(false);
    }

    const updateContent = e => {
        const contentStr = e.target.value;
        const trimmedContent = contentStr.replaceAll(/ |​/g, '');

        if (trimmedContent.length < 1) setIsValid(false);
        else setIsValid(true);

        if (contentStr.length <= 2000) setContent(contentStr);
    }

    useEffect(() => {
        if (isValid || isFocus) setShowSubmit(true);
        else setShowSubmit(false);
    }, [isValid, isFocus])

    return (
        <Container>
            <textarea
                placeholder="Write a comment..."
                onChange={updateContent}
                value={content}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            />
            { showSubmit &&
                <Buttons>
                    <button
                        onClick={cancel}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={!isValid || isWaiting}
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </Buttons>
            }
        </Container>
    )
}

export default CommentBox;
