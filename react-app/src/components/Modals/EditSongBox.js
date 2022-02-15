import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import RectangularButton from '../Buttons/RectangularButton';
import EditSong from '../Forms/EditSong';

function EditSongBox({song}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}><RectangularButton>Edit</RectangularButton></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSong setShowModal={setShowModal} song={song}/>
                </Modal>
            )}
        </>
    );
}

export default EditSongBox;
