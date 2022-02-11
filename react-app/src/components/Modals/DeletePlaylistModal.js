import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePlaylist from '../Forms/DeletePlaylist';
import styled from 'styled-components';

const DPIcon = styled.div`
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

function DeletePlaylistModal({playlist, defColor="#FFF"}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <DPIcon id="delete" className='actions' defColor={defColor} onClick={() => setShowModal(true)}><i className="fas fa-dumpster" /></DPIcon>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePlaylist setShowModal={setShowModal} playlist={playlist}/>
        </Modal>
      )}
    </>
  );
}

export default DeletePlaylistModal;
