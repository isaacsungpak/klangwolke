import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteSong from '../Forms/DeleteSong';

function DeleteSongModal({song}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div id="delete" className='actions' onClick={() => setShowModal(true)}><i className="fas fa-dumpster" /></div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteSong setShowModal={setShowModal} song={song}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteSongModal;
