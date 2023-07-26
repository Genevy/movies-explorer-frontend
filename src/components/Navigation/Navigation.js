import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className='navigation'>
      <div className='navigation__link'>
        <NavLink
          to='/signup'
          className='navigation__button navigation__button_signup hover-button'
        >
          Регистрация
        </NavLink>
        <NavLink
          to='/signin'
          className='navigation__button navigation__button_signin hover-button'
        >
          Войти
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
