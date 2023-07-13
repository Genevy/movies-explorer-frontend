import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ list }) {
  const moviesFilter = list.filter((item) => !item.owner);

  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList
        list={moviesFilter}
        savedmovies={true} // Отключаем кнопку "Ещё" согласно макету ДР
      />
    </main>
  );
}

export default SavedMovies;
