import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ findedMovies, isLoading, onSave, checkIsLiked, onDelete, ...props }) {
  const { pathname } = useLocation();


  return (
    <section className='movies-list'>
      {
        isLoading ? <Preloader />
        : <ul className='movies-list__grid'>
        {
          findedMovies.map((item) => (
            <MoviesCard
              checkIsLiked={checkIsLiked}
              onSave={onSave}
              key={item.movieId}
              onDelete={onDelete} 
              card={item}
            />
            ))
        }
      </ul>
      }
      {
        (pathname === '/movies' && !isLoading && !props.isFullSliced) || (props.isFullSliced && findedMovies.length === 0)
          ? ((findedMovies.length === 0) ?  
          <>
          <p>{props.searchMessage}</p>
          </>
          : (
            <button
              className='movies-list__more-button hover-button'
              type='button'
              aria-label='Показать еще'
              onClick={props.onPagination}
            >
              Ещё
            </button>
            ))
          : <></> 
        }
    </section>
  );
}

export default MoviesCardList;
