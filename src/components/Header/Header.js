import { Routes, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import Burger from '../Burger/Burger';

function Header() {
  return (
    <Routes>
      <Route
        exact
        path='/'
        element={
          <header className='header header_type_landing'>
            <Logo />
            <Navigation />
          </header>
        }
      ></Route>

      <Route
        exact
        path='/movies/*'
        element={
          <header className='header'>
            <Logo />
            <Burger />
          </header>
        }
      ></Route>

      <Route
        exact
        path='/saved-movies/*'
        element={
          <header className='header'>
            <Logo />
            <Burger />
          </header>
        }
      ></Route>

      <Route
        exact
        path='/profile'
        element={
          <header className='header'>
            <Logo />
            <Burger />
          </header>
        }
      ></Route>
    </Routes>
  );
}

export default Header;
