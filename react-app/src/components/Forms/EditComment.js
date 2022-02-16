import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../store/songs";
import FormContainer from "./FormContainer";

function EditComment({comment, setShowModal}) {
    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState('');
    const [content, setContent] = useState(comment.content);
    const [isWaiting, setIsWaiting] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsWaiting(true);
        dispatch(editComment({ commentId: comment.id, content }))
          .then((res) => {
            setIsWaiting(false);
            if (res.error) setErrorMessage(res.payload[0]);
            else setShowModal(false);
          });
    }

    const updateContent = (e) => {
      let errorMsg = '';
      const contentStr = e.target.value;
      const trimmedContent = contentStr.replaceAll(/ |​/g, '');
      setContent(contentStr);

      if (contentStr.length > 2000) errorMsg ='Comment length cannot exceed 2000 characters';
      else if (trimmedContent.length < 1) errorMsg = 'Comment must contain at least 1 non-space character';
      setErrorMessage(errorMsg);
    }

    const cancel = e => {
      e.preventDefault();
      setShowModal(false);
    }

    return (
        <>
            <FormContainer show={isWaiting}>
                <div id='form-title'>Edit Comment</div>
                <form onSubmit={handleSubmit} id="edit-form">
                <div id="title-input" className="field">
                    {errorMessage !== '' &&
                        <div className='bad-input'>{errorMessage}</div>
                    }
                    <textarea
                        onChange={updateContent}
                        value={content}
                    />
                </div>
                <div id='button-container'>
                    <button type="submit" className={ (errorMessage !== '' || !content || content  === comment.content ) ? 'disabled' : ''} disabled={ errorMessage !== '' || !content || content  === comment.content || isWaiting }>Submit</button>
                    <button onClick={cancel}>Cancel</button>
                </div>
                </form>
            </FormContainer>
        </>
    )
}

export default EditComment;
