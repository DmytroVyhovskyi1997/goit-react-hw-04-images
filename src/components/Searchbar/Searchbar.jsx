import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';

function Searchbar({ onSubmit }) {
  const [currentSearch, setCurrentSearch] = useState('');

  const handleName = e => {
    setCurrentSearch(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!currentSearch.trim()) {
      Notiflix.Notify.failure('Please fill search field.');
      return;
    }

    onSubmit(currentSearch);
    setCurrentSearch('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>Search</span>
        </button>
        <input
          onChange={handleName}
          value={currentSearch}
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

