import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from '../Forms/EditComment';
import RectangularButton from '../Buttons/RectangularButton';

function EditCommentBox({comment}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}><RectangularButton>Edit</RectangularButton></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditComment setShowModal={setShowModal} comment={comment}/>
                </Modal>
            )}
        </>
    );
}

export default EditCommentBox;
