import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  const location = useLocation();

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

  const [isLiked, setLike] = useState(false);

  function handleCardLike() {
    setLike(!isLiked);
  }

  const cardButtonClassName = location.pathname === '/saved-movies'
    ? 'movie__remove hover-button'
    : `movie__like hover-button ${isLiked ? 'movie__like_active' : ''}`;

  return (
    <li className='movie'>
      <div className='movie__header'>
        <h2 className='movie__title'>{props.card.nameRU}</h2>

        <button
          className={cardButtonClassName}
          type='button'
          onClick={handleCardLike}
        ></button>
      </div>
      <p className='movie__duration'>{getTimeFromMins(props.card.duration)}</p>
      <img
        className='movie__picture'
        src={props.card.image}
        alt='Фильм'
      />
    </li>
  );
}

export default MoviesCard;
