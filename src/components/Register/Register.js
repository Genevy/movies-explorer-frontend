import { Navigate } from 'react-router-dom';
import useValidation from '../../customHooks/useValidation';
import initValidState from '../../utils/initValidState';
import AuthForm from '../AuthForm/AuthForm';
import './Register.css';

function Register({ onSubmit, isLoggedIn }) {
  const { formValues, handleChange } = useValidation({
    name: initValidState,
    email: initValidState,
    password: initValidState,
  });
  const handleSubmit = () => {
    return onSubmit({
      name: formValues.name.value,
      email: formValues.email.value,
      password: formValues.password.value,
    });
  };
  if (isLoggedIn) return ( <Navigate to={'/'} replace /> )
  return (
    <AuthForm
      link='/signin'
      title='Добро пожаловать!'
      buttonText='Зарегистрироваться'
      subtitle='Уже зарегистрированы?'
      linkName='Войти'
      onSubmit={handleSubmit}
      toggleSubmit={(formValues.name.isValid() && formValues.email.isValid() && formValues.password.isValid())}
    >
      <label className='auth__label'>
        Имя
        <input
          id='name'
          name='name'
          type='name'
          className={`auth__input${formValues.email.isValid() ? ' auth__input_valid' : ' auth__input_invalid'}` }
          placeholder='Введите имя'
          minLength='2'
          maxLength='40'
          required
          value={formValues.name.value}
          onChange={handleChange}
        />
        <span className='auth__input-error'>{formValues.name.validationMessage}</span>
        <label className='auth__label'>
          E-mail
          <input
            id='email'
            name='email'
            type='email'
            className='auth__input'
            placeholder='Введите email'
            required
            value={formValues.email.value}
            onChange={handleChange}
          />
          <span className='auth__input-error'>{formValues.email.validationMessage}</span>
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
            autoComplete='on'
            value={formValues.password.value}
            onChange={handleChange}
          />
          <span className='auth__input-error'>{formValues.password.validationMessage}</span>
        </label>
      </label>
      {/* <span className='auth__input-error reg-form'>Что-то пошло не так...</span> */}
    </AuthForm>
  );
}

export default Register;
