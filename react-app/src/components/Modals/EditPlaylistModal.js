import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPlaylist from '../Forms/EditPlaylist';
import styled from 'styled-components';

const EPIcon = styled.div`
    color: ${props => props.defColor};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    width: 100%;
    height: 100%;

    &:hover {
        color: #407BA7;
    }
`

function EditPlaylistModal({playlist, defColor="#FFF"}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <EPIcon id="edit" className='actions' defColor={defColor} onClick={() => setShowModal(true)}><i className="fas fa-edit" /></EPIcon>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                <EditPlaylist setShowModal={setShowModal} playlist={playlist}/>
                </Modal>
            )}
        </>
    );
}

export default EditPlaylistModal
