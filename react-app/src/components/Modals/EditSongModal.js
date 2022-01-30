import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSong from '../Forms/EditSong';
import styled from 'styled-components';

const ESIcon = styled.div`
  color: ${props => props.defColor};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #407BA7;
}
`

function EditSongModal({song, defColor='#FFF'}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ESIcon
        id="edit"
        className='actions'
        onClick={() => setShowModal(true)}
        defColor={defColor}
      >
        <i className="fas fa-edit" />
      </ESIcon>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSong setShowModal={setShowModal} song={song}/>
        </Modal>
      )}
    </>
  );
}

export default EditSongModal
