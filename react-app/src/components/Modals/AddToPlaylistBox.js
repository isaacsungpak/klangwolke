import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import RectangularButton from '../Buttons/RectangularButton';
import DoubleATPForm from '../Forms/DoubleATPForm';

function AddToPlaylistBox({song}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}><RectangularButton>Add To Playlist</RectangularButton></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DoubleATPForm setShowModal={setShowModal} songId={song.id}/>
                </Modal>
            )}
        </>
    );
}

export default AddToPlaylistBox;
