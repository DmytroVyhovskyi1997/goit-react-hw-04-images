import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modal = document.getElementById('modal-root');
export class Modal extends Component {
  static propTypes = {
    selectedImage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { handleImg, selectedImage, tags } = this.props;
    return createPortal(
      <div onClick={handleImg} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={selectedImage} alt={tags} />
        </div>
      </div>,
      modal
    );
  }
}
