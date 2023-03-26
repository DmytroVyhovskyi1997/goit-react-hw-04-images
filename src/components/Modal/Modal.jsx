import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modal = document.getElementById('modal-root');

const Modal = ({ selectedImage, onClose,  tags  }) =>{
 
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div onClick={onClose} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={selectedImage} alt={tags} />
      </div>
    </div>,
    modal
  );
}

Modal.propTypes = {
  selectedImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;