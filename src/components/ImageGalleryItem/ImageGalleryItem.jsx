import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { GalleryItemImg } from '../ImageGalleryItem/ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
      <GalleryItemImg
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal
          image={largeImageURL}
          tags={tags}
          onClose={toggleModal}
        />
      )}
    </div>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;