import React from 'react';
import './NavTab.css';

function NavTab() {
  const handleLinkClick = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className='nav'>
      <ul className='nav__list'>
        <li className='nav__item'>
          <a
            className='nav__link hover-link nav__link--button'
            href="/#"
            onClick={(event) => handleLinkClick(event, 'about')}
          >
            О проекте
          </a>
        </li>
        <li className='nav__item'>
          <a
            className='nav__link hover-link nav__link--button'
            href="/#"
            onClick={(event) => handleLinkClick(event, 'tech')}
          >
            Технологии
          </a>
        </li>
        <li className='nav__item'>
          <a
            className='nav__link hover-link nav__link--button'
            href="/#"
            onClick={(event) => handleLinkClick(event, 'student')}
          >
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
