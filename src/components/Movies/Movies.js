import { useEffect, useState } from 'react';
import useWidth from '../../customHooks/useWidth';
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { PAGINATION_CONFIG } from '../../utils/moviesParams';

function Movies({ movies, isLoading, findedMovies, onSave, checkIsLiked, onDelete, searchMessage, ...props }) {
  const [ sliceNumber, setSliceNumber ] = useState(0); // отображаемое количество фильмов
  const [ slicedMovies, setSlicedMovies ] = useState([]); // массив отображаемых фильмов
  const [ moviesQuanityOnRow, setMoviesQuanityOnRow ] = useState(3); // количество фильмов на строке
  const [ initMoviesQuanity, setInitMoviesQuanity ] = useState(6); // начальное количество фильмов
  const [ isFullSliced, setIsFullSliced ] = useState(true);

  const width = useWidth();

  const handleWidthResize = () => {
    if (width > 932) {
      setMoviesQuanityOnRow(PAGINATION_CONFIG.PC.MOVIES_ON_ROW);
      setInitMoviesQuanity(PAGINATION_CONFIG.PC.INIT_MOVIES_QUANITY);
    } else if (width > 648 ) {
      setMoviesQuanityOnRow(PAGINATION_CONFIG.TABLET.MOVIES_ON_ROW);
      setInitMoviesQuanity(PAGINATION_CONFIG.TABLET.INIT_MOVIES_QUANITY);
    } else {
      setMoviesQuanityOnRow(PAGINATION_CONFIG.MOBILE.MOVIES_ON_ROW);
      setInitMoviesQuanity(PAGINATION_CONFIG.MOBILE.INIT_MOVIES_QUANITY);
    }
  };
  const handleMoviesQuanity = () => setSliceNumber(initMoviesQuanity); 
  
  const handleSlicedMovies = () => {
    setSlicedMovies(findedMovies.slice(0, sliceNumber));
  }
  
  useEffect(handleWidthResize, [width]); // поменять количество фильмов на строке и начальное количесво
  
  // установит количество фильмов при изменнии массива найденных фильмов
  useEffect(handleMoviesQuanity, [findedMovies]);
  
  useEffect(handleSlicedMovies, [sliceNumber, findedMovies]);
  
  useEffect(() => setIsFullSliced(findedMovies.length === slicedMovies.length), [findedMovies, sliceNumber, slicedMovies])

  const handleAddMoreMovies = () => {
    if (sliceNumber % moviesQuanityOnRow !== 0) {
      setSliceNumber(state => state += (moviesQuanityOnRow - (sliceNumber % moviesQuanityOnRow)));
      return; //если убрать то можно запонить предыдущую строку и добовить новую
    }
    setSliceNumber(state => state += moviesQuanityOnRow);
  };
  
  return (
    <main className='movies'>
      <SearchForm { ...props } />
      <MoviesCardList
        findedMovies={slicedMovies}
        isLoading={isLoading}
        onSave={onSave}
        checkIsLiked={checkIsLiked}
        onDelete={onDelete}
        onPagination={handleAddMoreMovies}
        isFullSliced={isFullSliced}
        searchMessage={searchMessage}
      />
    </main>
  );
}

export default Movies;
