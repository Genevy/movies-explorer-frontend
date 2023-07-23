import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AboutMe.css';
import myPhoto from '../../images/genevy.jpg';
import myPhotoHover from '../../images/genevy_hover.jpg';

function AboutMe() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section id='student' className='student'>
      <h2 className='student__title'>Студент</h2>

      <div className='about-section'>
        <div className='about-section__text'>
          <h3 className='about-section__title'>Евгений</h3>
          <p className='about-section__subtitle'>
            Фронтенд-разработчик, 44 года
          </p>
          <p className='about-section__description'>
            Я родился и живу в Сочи, закончил фармацевтический факультет.
            Сейчас временно не работаю. Как хобби, увлекаюсь разработкой интернет сайтов.
            Тема разработки web-сайтов привлекла меня из-за её обширного спектра применения и
            возможностью полноценно работать удалённо.
          </p>
          <NavLink
            className='about-section__link hover-link'
            to='https://github.com/Genevy'
            target='_blank'
            rel='noopener noreferrer'
          >
            Github
          </NavLink>
        </div>

        <div
          className='about-section__photo-section'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            className='about-section__photo'
            src={isHovered ? myPhotoHover : myPhoto}
            alt='Фото разработчика'
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
