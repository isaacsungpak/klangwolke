import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../store/songs";
import FormContainer from "./FormContainer";

function DeleteComment({commentId, setShowModal}) {
    const dispatch = useDispatch();

    const [isWaiting, setIsWaiting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsWaiting(true);
        dispatch(deleteComment(commentId))
          .then(() => setIsWaiting(false))
          .then(() => setShowModal(false));
    }

    const cancel = e => {
      e.preventDefault();
      setShowModal(false);
    }

    return (
      <>
        <FormContainer show={isWaiting}>
          <div id='form-title'>Delete Comment</div>
          <div id='question-template'>Are you sure that you want to delete this comment?</div>
          <form onSubmit={handleSubmit} id="delete-form">
            <div id='delete-button-container'>
              <button onClick={cancel}>Cancel</button>
              <button type="submit" disabled={ isWaiting }>Yes</button>
            </div>
          </form>
        </FormContainer>
      </>
    )
}

export default DeleteComment;
