import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';
import Logo from '../Logo/Logo';
import errorMesages from '../../utils/errorMesages';

function AuthForm({
  link,
  buttonText,
  linkName,
  title,
  subtitle,
  isValid,
  children,
  onSubmit,
  toggleSubmit,
}) {
  const [ isFetching, setIsFetching ] = useState(false);
  const [ serverErrorMessage, setServerErrorMessage ] = useState('');
  const handleSubmit = event => {
    setIsFetching(true);
    event.preventDefault();
    onSubmit()
      .then(() => setServerErrorMessage(''))
      .catch((errCode) => {
        if (errCode === 400) {
          setServerErrorMessage(errorMesages.validatinError);
        }
        if (errCode === 401) {
          setServerErrorMessage(errorMesages.badData);
        }
        if (errCode === 409) {
          setServerErrorMessage(errorMesages.duplicateEmail);
        }
        if (errCode === 500) {
          setServerErrorMessage(errorMesages.serverError);
        }
      })
      .finally(() => setIsFetching(false));
  }
  return (
    <section className='auth'>
      <Logo />
      <h1 className='auth__title'>{title}</h1>
      <form className='auth__form' onSubmit={handleSubmit} noValidate>
        {children}
      <span className="auth__submit-error">{serverErrorMessage}</span>
      <button
        className='auth__submit-button hover-button'
        type='submit'
        disabled={(!isFetching && !toggleSubmit)}
      >
        {buttonText}
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
      </form>
    </section>
  );
}

export default AuthForm;
