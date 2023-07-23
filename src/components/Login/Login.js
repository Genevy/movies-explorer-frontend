import useValidation from '../../customHooks/useValidation';
import initValidState from '../../utils/initValidState';
import AuthForm from '../AuthForm/AuthForm';
import './Login.css'

function Login({ onSubmit }) {
  const { formValues, handleChange } = useValidation({
    email: initValidState,
    password: initValidState,
  });
  const handleSubmit = () => {
    return onSubmit({
      email: formValues.email.value,
      password: formValues.password.value,
    });
  }
  return (
    <AuthForm
      link='/signup'
      title='Рады видеть!'
      buttonText='Войти'
      subtitle='Ещё не зарегистрированы?'
      linkName='Регистрация'
      onSubmit={handleSubmit}
      toggleSubmit={formValues.password.isValid() && formValues.email.isValid()}
    >
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
    </AuthForm>
  );
}

export default Login;
