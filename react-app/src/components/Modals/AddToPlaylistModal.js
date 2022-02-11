import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import styled from 'styled-components';
import DoubleATPForm from '../Forms/DoubleATPForm';

const ATPIcon = styled.div`
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

function AddToPlaylistModal({songId, defColor='#FFF'}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ATPIcon
        id="playlist"
        className='actions'
        onClick={() => setShowModal(true)}
        defColor={defColor}
      >
        <i className="fas fa-bars" />
      </ATPIcon>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DoubleATPForm songId={songId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddToPlaylistModal;
