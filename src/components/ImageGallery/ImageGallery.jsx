import { useMemo } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import  ImageGalleryItem  from 'components/ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ images, openModal }) {
  const imageItems = useMemo(
    () =>
      images.map(({ webformatURL, largeImageURL, id, tags }) => (
        <ImageGalleryItem
          key={id}
          previewImg={webformatURL}
          alt={tags}
          src={largeImageURL}
          openModal={() => openModal(largeImageURL)}
        />
      )),
    [images, openModal]
  );

  return <ul className={css.ImageGallery}>{imageItems}</ul>;
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;

