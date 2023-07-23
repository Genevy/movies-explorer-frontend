import { Link, useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard(props) {
  const isLiked = props.checkIsLiked ? props.checkIsLiked(props.card) : true;
  const location = useLocation();



  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

  function handleCardLike() {
    if (isLiked) {
      props.onDelete(props.card);
    } else {
      props.onSave(props.card);
    }
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
      <Link className="hover-link" to={props.card.trailerLink} target="_blank" rel="noopener noreferrer">
        <img
          className='movie__picture'
          src={props.card.image}
          alt='Фильм'
        />
      </Link>
    </li>
  );
}

export default MoviesCard;
