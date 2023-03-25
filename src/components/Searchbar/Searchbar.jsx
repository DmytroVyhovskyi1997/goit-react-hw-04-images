import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { Component } from 'react';
import Notiflix from 'notiflix';

export class Searchbar extends Component {
  static propTypes = {
    currentSearch: PropTypes.string,
  };
  state = {
    currentSearch: '',
  };

  handleName = e => {
    this.setState({ currentSearch: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.currentSearch.trim()) {
      Notiflix.Notify.failure('PLease, fill search field.');
      return;
    }
    this.props.onSubmit(this.state.currentSearch);
    this.setState({ currentSearch: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>
          <input
            onChange={this.handleName}
            value={this.state.currentSearch}
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
}
