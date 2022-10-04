import React, { useEffect } from 'react';
import { Overlay, ModalWindow, ModalImg } from './Modal.styled';
import PropTypes from 'prop-types';

const Modal = ({ image, tags, onClose }) => {
  useEffect(() => {
    const handleClickByEsc = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleClickByEsc);
    return () => {
      window.removeEventListener('keydown', handleClickByEsc);
    };
  }, [onClose]);
  
  const handleClickOnBackdrop = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClickOnBackdrop}>
      <ModalWindow>
        <ModalImg src={image} alt={tags} />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;