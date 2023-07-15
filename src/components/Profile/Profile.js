import { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  // временные значения
  const userName = 'Виталий';
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState('pochta@yandex.ru');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <main className='profile'>
      <h2 className='profile__title'>{`Привет, ${userName}!`}</h2>

      <form className='profile__form'>
        <label className='profile__label'>
          Имя
          <input
            id='profile__name'
            name='profile__name'
            type='profile__name'
            className='profile__input'
            minLength='2'
            maxLength='40'
            required
            value={name || ''}
            onChange={handleChangeName}
          />
          <span className='profile__input-error'></span>
        </label>
        <label className='profile__label'>
          E-mail
          <input
            id='profile__email'
            name='profile__email'
            type='profile__email'
            className='profile__input'
            minLength='4'
            maxLength='40'
            required
            value={email || ''}
            onChange={handleChangeEmail}
          />
          <span className='profile__input-error'></span>
        </label>
      </form>

      <button
        className='profile__button profile__button_type_change hover-button'
        type='submit'
      >
        Редактировать
      </button>

      {/* временное решение для тестирования  */}
      <button
        className='profile__button profile__button_type_logout hover-button'
        type='submit'
      >
        <Link
          className='profile__button-link'
          to='/'
        >
          Выйти из аккаунта
        </Link>
      </button>
    </main>
  );
}

export default Profile;
