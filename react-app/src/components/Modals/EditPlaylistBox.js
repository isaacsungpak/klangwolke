import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPlaylist from '../Forms/EditPlaylist';
import RectangularButton from '../Buttons/RectangularButton';

function EditPlaylistBox({playlist}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}><RectangularButton onClick={() => setShowModal(true)}>Edit</RectangularButton></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPlaylist setShowModal={setShowModal} playlist={playlist}/>
                </Modal>
            )}
        </>
    );
}

export default EditPlaylistBox;
