import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import Burger from '../Burger/Burger';
import './Header.css';

function Header(props) {
  const { pathname } = useLocation();
  const { isLoggedIn } = props;
  if (!isLoggedIn) {
    if(pathname === '/') {
      return (
        <header className='header header_type_landing'>
          <Logo />
          <Navigation />
        </header>
      )
    }
    return (<></>)
  } else {
    return (
      <header className='header header_type_movies'>
        <Logo />
        <Burger />
      </header>
    )
  }
}

export default Header;
