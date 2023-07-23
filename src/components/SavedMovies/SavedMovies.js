import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({ movies, findedMovies, onDelete, ...props }) {

  return (
    <main className='saved-movies'>
      <SearchForm  { ...props } />
      <MoviesCardList
        findedMovies={findedMovies}
        savedmovies={true} // Отключаем кнопку "Ещё" согласно макету ДР
        onDelete={onDelete} 
      />
    </main>
  );
}

export default SavedMovies;
