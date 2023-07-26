const MOVIES_URL = 'https://api.nomoreparties.co';

const getAllMovies = () => fetch(`${MOVIES_URL}/beatfilm-movies`)
	.then((res) => res.ok ? res.json() : Promise.reject(res.status));

export { getAllMovies, MOVIES_URL };