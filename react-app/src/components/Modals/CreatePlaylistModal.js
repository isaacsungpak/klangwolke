import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../../context/Modal';
import CreatePlaylist from '../Forms/CreatePlaylist';

const CreateButton = styled.div`
    width: 176px;
    height: 176px;
    margin: 10px;
    background-color: white;
    border: 2px groove black;

    color: black;
    font-size: 40px;
    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      box-shadow: 2px 5px 3px rgba(0, 0, 0, 0.3);
    }

    @media screen and (max-width: 1240px) {
      width: 146px;
      height: 146px;
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
