import { Modal } from '../../context/Modal';
import UploadSong from '../Forms/UploadSong';
import { useState } from 'react';

function UploadSongModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className='nav-option starter-tab' id="upload" onClick={() => setShowModal(true)}><div>Upload</div></div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadSong setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default UploadSongModal
