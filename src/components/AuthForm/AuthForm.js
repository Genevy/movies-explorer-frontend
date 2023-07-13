import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function AuthForm({
  link,
  buttonText,
  linkName,
  title,
  subtitle,
  isValid,
  linkTo,
  ...props
}) {
  return (
    <section className='auth'>
      <Logo />
      <h1 className='auth__title'>{title}</h1>
      <form className='auth__form'>
        <>{props.children}</>
        <label className='auth__label'>
          E-mail
          <input
            id='email'
            name='email'
            type='email'
            className='auth__input'
            placeholder='Введите email'
            minLength='8'
            maxLength='40'
            required
          />
          <span className='auth__input-error'></span>
        </label>
        <label className='auth__label'>
          Пароль
          <input
            id='password'
            name='password'
            type='password'
            className='auth__input'
            placeholder='Введите пароль'
            minLength='4'
            maxLength='40'
            required
          />
          <span className='auth__input-error'></span>
        </label>
      </form>

      <button
        className={`auth__submit-button hover-button ${props.buttonClass}`}
        type='submit'
      >
        <Link
          className='auth__button-link'
          to={linkTo}
        >
          {buttonText}
        </Link>
      </button>

      <p className='auth__text'>
        {subtitle}
        <Link
          className='auth__link hover-link'
          to={link}
        >
          {linkName}
        </Link>
      </p>
    </section>
  );
}

export default AuthForm;
