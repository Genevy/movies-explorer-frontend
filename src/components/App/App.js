import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';

import { movies } from '../../utils/TestMovies';

function App() {
  return (
    <div className='app'>
      <Header />

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies list={movies} />} />
        <Route path='/saved-movies' element={<SavedMovies list={movies} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
