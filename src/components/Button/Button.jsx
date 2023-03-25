import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ btnReadMore }) => {
  return (
    <div>
      <button type="button" className={css.Button} onClick={btnReadMore}>
        Load more
      </button>
    </div>
  );
};
Button.propTypes = {
  btnReadMore: PropTypes.func.isRequired,
};
