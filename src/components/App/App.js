import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';

import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import { MOVIES_URL, getAllMovies } from '../../utils/MoviesApi';
import useValidation from '../../customHooks/useValidation';
import initValidState from '../../utils/initValidState';
import PreloaderPage from '../PreloaderPage/PreloaderPage';
import { SHORT_MOVIES_LENGTH } from '../../utils/moviesParams';

function App() {
  const navigate = useNavigate(); // хук навигации

  const [ currentUser, setCurrentUser ] = useState({ email: '', name: '' });
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ allMovies, setAllMovies ] = useState([]);
  const [ findedMovies, setFindedMovies ] = useState([]);
  const [ userMovies, setUserMovies ] = useState([]);
  const [ findedUserMovies, setFindedUserMovies ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ searchMoviesText, setSearchMoviesText ] = useState('');
  // // Стейты чекбоксов короткого метра
  const [ isShortMovies, setIsShortMovies] = useState(false);
  const [ isShortUserMovies, setIsShortUserMovies] = useState(false);
  // стейты инпутов поиска
  const { formValues: moviesFormValue, handleChange: handleMoviesChange, resetForm: resetMoviesForm } = useValidation({ search: initValidState });
  const { formValues: userMoviesFormValue, handleChange: handleUserMoviesChange, resetForm: resetUserMoviesForm } = useValidation({ search: initValidState });
  const [ isFirstSearch, setIsFirstSearch ] = useState(true);
  const { pathname } = useLocation();

  const handleShortMovies = () => setIsShortMovies(!isShortMovies);
  const handleShortUserMovies = () => setIsShortUserMovies(!isShortUserMovies);


  // преобразовать фильм в формат нашей бд, чтобы фильмы были в одном формате
  const transformMovies =  (arr) => arr.map(movie => {
    return {
      country: movie.country,
      description: movie.description,
      director: movie.director,
      duration: movie.duration,
      image: `${MOVIES_URL}${movie.image.url}`,
      movieId: movie.id,
      nameEN: movie.nameEN,
      nameRU: movie.nameRU,
      thumbnail: `${MOVIES_URL}${movie.image.formats.thumbnail.url}`,
      trailerLink: movie.trailerLink,
      year: movie.year,
    }
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ email: '', name: '' });
    setUserMovies([]);
    setAllMovies([]);
    setFindedMovies([]);
    setFindedUserMovies([])
    setIsShortMovies(false);
    setIsShortUserMovies(false);
    resetMoviesForm({ search: initValidState });
    resetUserMoviesForm({ search: initValidState });
    setIsFirstSearch(true);
    localStorage.clear();
    mainApi.setAuthHeaders(null);
  };


  const errorHandler = (errCode) => {
    if (errCode=== 401) handleLogout();
    console.log(errCode);
  }

  // проверка токена
  const checkToken = () => {
    mainApi.getUserInfo()
      .then(res => {
        if (res) {
          setIsLoggedIn(true);
        }
      })
      .catch(errorHandler)
      .finally(() => setIsLoading(false));
  };

  const checkTokenEffectHandler = () => {
    const token = localStorage.getItem('token');
    if (!token) return setIsLoading(false);
    mainApi.setAuthHeaders(token);
    checkToken();
  };

  const handleLoggedInUser = () => {
    Promise.all([mainApi.getUserInfo(), mainApi.getUserMovie()])
    .then(([userData, moviesList]) => {
      setCurrentUser(userData);
      setUserMovies(moviesList);
      setFindedUserMovies(moviesList);
      // navigate('/movies', {replace: true});
      const lastSearch =  JSON.parse(localStorage.getItem('lastSearch'));
      const allMoviesFromStorage =  JSON.parse(localStorage.getItem('movies'));
      if (allMoviesFromStorage) {
        setAllMovies(allMoviesFromStorage);
      } else {
        setSearchMoviesText('Нужно ввести ключевое слово');
      }
      if (lastSearch) {
        setIsFirstSearch(lastSearch.isFirstSearch);
        setFindedMovies(lastSearch.findedMovies);

        resetMoviesForm(lastSearch.sortPhrase);
      }
    })
    .catch(errorHandler);
  };


  const loggedChangeHandler = () => {
    if (isLoggedIn) {
      handleLoggedInUser();
    }
  };

  const handleFindedMoviesEffect = () => {
    if (!isFirstSearch) {
      const lastSearch = { isFirstSearch, findedMovies, sortPhrase: moviesFormValue, isShort: isShortMovies };
      localStorage.setItem('lastSearch', JSON.stringify(lastSearch));
    }
  };

  const resetuserMoviesSearch = () => {
    if (isLoggedIn && pathname !== 'savedMovies') {
      resetUserMoviesForm();
      filterUserMovies();
      setIsShortUserMovies(false);
    }
  }

  useEffect(checkTokenEffectHandler, []); //проверка токена
  useEffect(loggedChangeHandler, [isLoggedIn]); // проверка авторизованности пользователя
  useEffect(handleFindedMoviesEffect, [findedMovies]); // сохранение последнего поиска
  useEffect(resetuserMoviesSearch, [isLoggedIn, pathname])

  const filterMovies = (sortPhrase, isShort, moviesArray) => {
    const shortFilteredArray = moviesArray.filter((movie) => isShort ? movie.duration <= SHORT_MOVIES_LENGTH : !isShort);
    return shortFilteredArray.filter((movie) => movie.nameEN.toLowerCase().includes(sortPhrase.toLowerCase())
    || movie.nameRU.toLowerCase().includes(sortPhrase.toLowerCase()));
  };

  const getAndSortAllMovies = () => {
    setIsLoading(true);
    getAllMovies()
      .then((movies) => {
        const transformedMovies = transformMovies(movies);
        setAllMovies(transformedMovies);
        setIsFirstSearch(false);
        localStorage.setItem('movies', JSON.stringify(transformedMovies));
      })
      .finally(() => setIsLoading(false));
  };
  const filterAllMovies = () => {
    const filteredMovies = filterMovies(moviesFormValue.search.value, isShortMovies, allMovies);
    if (filteredMovies.length === 0) {
      setSearchMoviesText('По вашему запросу ничего не найдено');
    } else if (!moviesFormValue.search.value) {
      setSearchMoviesText('Нужно ввести ключевое слово');
    }
    setFindedMovies(filteredMovies);
  };
  const filterUserMovies = () => {
    const filteredMovies = filterMovies(userMoviesFormValue.search.value, isShortUserMovies, userMovies);
    setFindedUserMovies(filteredMovies);
  };


  const handleSearchMovies = () => {
    if (!moviesFormValue.search.value) {
      setFindedMovies([]);
      setSearchMoviesText('Нужно ввести ключевое слово');
      return ;
    }
    if (isLoggedIn) {
      if (isFirstSearch || allMovies.length < 1) {
        getAndSortAllMovies();
      } else {
        filterAllMovies();
      }
    }
  };

  const handleCheckBox = () => {
    if (allMovies.length === 0 && isFirstSearch) {
      setSearchMoviesText('Нужно ввести ключевое слово');
      return ;
    }
    handleSearchMovies();
  }

  const handleSearchUserMovies = () => filterUserMovies();

  // поиск по фильмам при сохранении массива всех фильмов, при клике по чекбоксу или при изменни массива пользовательских фильмов
  useEffect(handleSearchMovies, [allMovies]);
  useEffect(handleCheckBox, [isShortMovies]);

  // поиск по фильмам при изменеии массива всех пользовательских фильмов, при клике по чекбоксу
  useEffect(handleSearchUserMovies, [userMovies, isShortUserMovies]);

  const checkIsLiked = (movie) => userMovies.some((m) => m.movieId === movie.movieId);
  // получение id при удалении со страницы всех фильмов
  const getMoviesId = (movieId) => userMovies.find(movie => movie.movieId === movieId)._id;
  const deleteMovie = (movie) => {
    const id = movie._id ? movie._id : getMoviesId(movie.movieId);
    mainApi.deleteMovie(id)
      .then((m) => setUserMovies(state => state.filter(m => m._id !== id)))
    .catch(errorHandler);
  };

  const handleSaveMovie = (movie) => {
    mainApi.saveUserMovie(movie)
      .then((movie) => setUserMovies([movie, ...userMovies]))
      .catch(errorHandler);
  };



  // обработчики форм

  const handleLogin = (formValues) => {
    return mainApi.loginUser(formValues)
      .then(({ token }) => {
        if (token) {
          setIsLoggedIn(true);
          localStorage.setItem('token', token);
          mainApi.setAuthHeaders(token);
          navigate('/movies', { replace: true });
        }
      }); // отлавливаю ошибки в файле формы
  };
  const handleRegister = (formValues) => {
    return mainApi.registerUser(formValues)
      .then(res => {
        if (res) {
          handleLogin({
            email: formValues.email,
            password: formValues.password,
          });
        }
      }); // отлавливаю ошибки в файле формы
  };

  const handleEditUser = (formValues) => {
    return mainApi.updateUserInfo(formValues)
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
        }
      }); // отлавливаю ошибки в файле формы
  };


  const goBack = () => navigate(-1);

  // дожидаюсь ответа проверки токена
  if (!isLoggedIn && isLoading) return (<PreloaderPage />);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Header isLoggedIn={isLoggedIn} />

        <Routes>
          <Route path='/' element={<Main />} />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                element={Movies}
                handleChange={handleMoviesChange}
                isShortMovies={isShortMovies}
                handleCheck={handleShortMovies}
                searchValue={moviesFormValue}
                isLoggedIn={isLoggedIn}
                movies={allMovies}
                onSubmit={handleSearchMovies}
                onDelete={deleteMovie}
                onSave={handleSaveMovie}
                findedMovies={findedMovies}
                isLoading={isLoading}
                checkIsLiked={checkIsLiked}
                searchMessage={searchMoviesText}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                element={SavedMovies}
                handleChange={handleUserMoviesChange}
                isShortMovies={isShortUserMovies}
                handleCheck={handleShortUserMovies}
                searchValue={userMoviesFormValue}
                isLoggedIn={isLoggedIn}
                movies={userMovies}
                onSubmit={handleSearchUserMovies}
                findedMovies={findedUserMovies}
                onDelete={deleteMovie}
              />
            }
          />
          <Route path='/profile'
            element={
              <ProtectedRoute
                element={Profile}
                onSubmit={handleEditUser}
                onLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path='/signin' element={<Login onSubmit={handleLogin} isLoggedIn={isLoggedIn} />} />
          <Route path='/signup' element={<Register onSubmit={handleRegister} isLoggedIn={isLoggedIn} />} />
          <Route path='*' element={<NotFound goBack={goBack} />} />
        </Routes>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
