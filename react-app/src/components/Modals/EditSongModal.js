import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSong from '../Forms/EditSong';

function EditSongModal({song}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div id="edit" className='actions' onClick={() => setShowModal(true)}><i className="fas fa-edit" /></div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSong setShowModal={setShowModal} song={song}/>
        </Modal>
      )}
    </>
  );
}

export default EditSongModal
