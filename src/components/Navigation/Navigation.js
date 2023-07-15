import { NavLink, Route, Routes } from 'react-router-dom';

function Navigation() {
  return (
    <section className='navigation'>
      <Routes>
        <Route
          exact
          path='/'
          element={
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
          }
        ></Route>
      </Routes>
    </section>
  );
}

export default Navigation;
