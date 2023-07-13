import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ list }) {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList list={list} />
    </main>
  );
}

export default Movies;
