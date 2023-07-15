import React, { useState } from 'react';

function SearchForm() {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <section className='search-form'>
      <form className='search-form__form'>
        <span className='search-form__icon'></span>
        <input
          type='text'
          placeholder='Фильм'
          className='search-form__input'
          required
        />
        <button className='search-form__button hover-button'></button>
        <span className='search-form__divider'></span>
        <label className='search-form__filter'>
          <input
            type='checkbox'
            className='search-form__checkbox'
            checked={checked}
            onChange={handleChange}
          />
          <span
            className='search-form__checkbox-visible'
            hidden
          ></span>
          <p className='search-form__filter-name'>Короткометражки</p>
        </label>
      </form>
    </section>
  );
}

export default SearchForm;
