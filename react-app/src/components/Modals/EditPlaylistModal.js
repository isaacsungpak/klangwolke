import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPlaylist from '../Forms/EditPlaylist';

function EditPlaylistModal({playlist}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <div id="edit" className='actions' onClick={() => setShowModal(true)}><i className="fas fa-edit" /></div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <EditPlaylist setShowModal={setShowModal} playlist={playlist}/>
            </Modal>
        )}
        </>
    );
}

export default EditPlaylistModal
