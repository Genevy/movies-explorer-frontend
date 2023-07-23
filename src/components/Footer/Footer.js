import { NavLink, useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();
  if ( pathname === '/signup' || pathname === '/signin') {
    return (<></>)
  };
  return (
    <footer className='footer'>
      <h4 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h4>
      <div className='footer__wrapper'>
        <p className='footer__year'> &copy; {currentYear}</p>
        <ul className='footer__links'>
          <li className='footer__item'>
            <NavLink
              className='footer__link hover-link'
              to='https://praktikum.yandex.ru'
              target='_blank'
              rel='noopener noreferrer'
            >
              Яндекс.Практикум
            </NavLink>
          </li>
          <li className='footer__item'>
            <NavLink
              className='footer__link hover-link'
              to='https://github.com/Genevy'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github
            </NavLink>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
