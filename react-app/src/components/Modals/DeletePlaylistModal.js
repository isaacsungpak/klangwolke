import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePlaylist from '../Forms/DeletePlaylist';

function DeletePlaylistModal({playlist}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div id="delete" className='actions' onClick={() => setShowModal(true)}><i className="fas fa-dumpster" /></div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePlaylist setShowModal={setShowModal} playlist={playlist}/>
        </Modal>
      )}
    </>
  );
}

export default DeletePlaylistModal;
