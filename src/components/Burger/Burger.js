import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Burger() {
  const [menuActive, setMenuActive] = useState(false);

  function handleClickMenu() {
    setMenuActive(!menuActive);
    const header = document.querySelector('.header');
    if (header) {
      header.classList.toggle('header_menu-opened', !menuActive);
    }
  }

  return (
    <nav className={`menu ${menuActive ? 'menu_active' : ''}`}>
      <button
        className={
          menuActive
            ? 'menu__burger-button_close hover-button'
            : 'menu__burger-button hover-button'
        }
        onClick={handleClickMenu}
      ></button>

      <div
        className={`menu__content ${menuActive ? 'menu__content_opened' : ''}`}
      >
        <NavLink
          to='/'
          className='menu__main hover-link'
          onClick={handleClickMenu}
        >
          Главная
        </NavLink>

        <div className='menu__movies'>
          <NavLink
            to='/movies'
            className='menu__movies-all hover-link'
            onClick={handleClickMenu}
          >
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            className='menu__movies-saved hover-link'
            onClick={handleClickMenu}
          >
            Сохраненные фильмы
          </NavLink>
        </div>

        <NavLink
          to='/profile'
          className='menu__account hover-button'
          onClick={handleClickMenu}
        >
          Аккаунт
        </NavLink>
      </div>
    </nav>
  );
}

export default Burger;
