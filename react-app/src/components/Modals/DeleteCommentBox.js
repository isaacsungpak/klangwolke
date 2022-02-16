import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import RectangularButton from '../Buttons/RectangularButton';
import DeleteComment from '../Forms/DeleteComment';

function DeleteCommentBox({commentId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <div onClick={() => setShowModal(true)}><RectangularButton>Delete</RectangularButton></div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <DeleteComment setShowModal={setShowModal} commentId={commentId}/>
            </Modal>
        )}
    </>
  );
}

export default DeleteCommentBox;
