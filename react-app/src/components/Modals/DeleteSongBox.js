import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import RectangularButton from '../Buttons/RectangularButton';
import DeleteSong from '../Forms/DeleteSong';

function DeleteSongBox({song}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <div onClick={() => setShowModal(true)}><RectangularButton>Delete</RectangularButton></div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <DeleteSong setShowModal={setShowModal} song={song}/>
            </Modal>
        )}
    </>
  );
}

export default DeleteSongBox;
