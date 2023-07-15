import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ list, savedmovies }) {
  return (
    <section className='movies-list'>
      <ul className='movies-list__grid'>
        {list.map((item) => (
          <MoviesCard
            key={item.id}
            card={item}
            savedmovies={savedmovies}
          />
        ))}
      </ul>
      {savedmovies ? null : (
        <button
          className='movies-list__more-button hover-button'
          type='button'
          aria-label='Показать еще'
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
