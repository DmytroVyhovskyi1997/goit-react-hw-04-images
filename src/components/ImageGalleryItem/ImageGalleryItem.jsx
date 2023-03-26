import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ tags, previewImg, id, openModal }) {
  return (
    <li className={css.ImageGalleryItem} id={id}>
      <img
        className={css.ImageGalleryItem_image}
        src={previewImg}
        alt={tags}
        onClick={openModal}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string,
  previewImg: PropTypes.string,
  id: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
