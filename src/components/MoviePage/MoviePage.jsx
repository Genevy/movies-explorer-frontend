import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function MoviePage ({ movies, isLoading, findedMovies, onSave, checkIsLiked, onDelete, searchMessage, ...props }) {
	return (
		<main className='movies'>
      <SearchForm { ...props } />
      <MoviesCardList
        findedMovies={findedMovies}
        isLoading={isLoading}
        onSave={onSave}
        checkIsLiked={checkIsLiked}
        onDelete={onDelete}
        searchMessage={searchMessage}
      />
    </main>
	)
}

export default MoviePage;