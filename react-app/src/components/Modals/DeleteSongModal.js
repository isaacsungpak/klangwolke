import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteSong from '../Forms/DeleteSong';
import styled from 'styled-components';

const DSIcon = styled.div`
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

function DeleteSongModal({song, defColor='#FFF'}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <DSIcon
        id="delete"
        className='actions'
        onClick={() => setShowModal(true)}
        defColor={defColor}
      >
        <i className="fas fa-dumpster" />
      </DSIcon>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteSong setShowModal={setShowModal} song={song}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteSongModal;
