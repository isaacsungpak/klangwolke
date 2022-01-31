import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePlaylist from '../Forms/DeletePlaylist';
import RectangularButton from '../Buttons/RectangularButton';

function DeletePlaylistBox({playlist}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <div onClick={() => setShowModal(true)}><RectangularButton>Delete</RectangularButton></div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <DeletePlaylist setShowModal={setShowModal} playlist={playlist}/>
            </Modal>
        )}
    </>
  );
}

export default DeletePlaylistBox;
