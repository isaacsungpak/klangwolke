import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../../context/Modal';
import CreatePlaylist from '../Forms/CreatePlaylist';

const CreateButton = styled.div`
    width: 100%;
    height: 30px;
    background-color: #AAA;
    border-bottom: 2px groove #EEE;
    color: white;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.1s ease-in-out;

    &:hover {
      background-color: #888;
    }
`

function CreatePlaylistModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <CreateButton id="add" onClick={() => setShowModal(true)}><i className="fas fa-plus" /></CreateButton>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePlaylist setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreatePlaylistModal
