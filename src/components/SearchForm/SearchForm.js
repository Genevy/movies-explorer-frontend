import './SearchForm.css';

function SearchForm({ searchValue, handleChange, handleCheck, isShortMovies, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchValue.search.value, isShortMovies)
  }
  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit} noValidate>
        <span className="search-form__icon"></span>
        <input
          name="search"
          type="text"
          placeholder="Фильм"
          className="search-form__input"
          value={searchValue.search.value}
          onChange={handleChange}
          autoComplete="no"
          required
        />
        <button
          className="search-form__button hover-button"
          type="submit" />
        <span className="search-form__divider"></span>
        <label className="search-form__filter">
          <input
            type="checkbox"
            className="search-form__checkbox"
            checked={isShortMovies}
            onChange={handleCheck}
            // disabled={!searchValue.search.value || searchValue.search.isEmpty}
          />
          {/* <span className="search-form__checkbox-visible"></span> */}
          <p className="search-form__filter-name">Короткометражки</p>
        </label>
      </form>
    </section>
  );
}

export default SearchForm;
