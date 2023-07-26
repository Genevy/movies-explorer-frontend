import { useContext, useEffect, useState } from 'react';
import './Profile.css';
import initValidState from '../../utils/initValidState';
import useValidation from '../../customHooks/useValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import errorMesages from '../../utils/errorMesages';

function Profile({ onSubmit, onLogout }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [isSuccess, setIsSuccess] = useState(true);
  const { formValues, handleChange, resetForm } = useValidation({
    name: { ...initValidState, value: currentUser.name },
    email: { ...initValidState, value: currentUser.email },
  });
  const isValidInput = formValues.name.isValid() && formValues.email.isValid();
  const isNotEditedUserData = formValues.name.value === currentUser.name && formValues.email.value === currentUser.email;
  const toggleSubmit = isNotEditedUserData || !isValidInput || isFetching;
  
  const handleSubmit = (event) => {
    setIsFetching(true);
    setServerErrorMessage('');
    event.preventDefault();
    onSubmit({
      name: formValues.name.value,
      email: formValues.email.value,
    })
      .then(() => {
        setIsSuccess(true);
        setServerErrorMessage(errorMesages.successUserProfileUpdateMessege);
        setIsEditMode(false)
      })
      .catch((errCode) => {
        setIsSuccess(false)
        if (errCode === 400) {
          return setServerErrorMessage(errorMesages.editUserError);
        }
        if (errCode === 409) {
          return setServerErrorMessage(errorMesages.duplicateEmail);
        }
        if (errCode === 500) {
          return setServerErrorMessage(errorMesages.serverError);
        }
        setServerErrorMessage(errorMesages.someError);
      })
      .finally(() => setIsFetching(false));;
  }

  const handleEditMode = () => {
    setIsEditMode(true);
    setServerErrorMessage('');
  };
  useEffect(() => resetForm({
    name: { ...initValidState, value: currentUser.name, isDirty: true, isValid: () => true },
    email: { ...initValidState, value: currentUser.email, isDirty: true, isValid: () => true },
  }), [currentUser]);
  return (
    <main className='profile'>
      <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>

      <form
        className='profile__form'
        onSubmit={handleSubmit}
        noValidate
      >
        <label className='profile__label'>
          Имя
          <input
            name='name'
            type='name'
            className='profile__input'
            minLength='2'
            maxLength='40'
            required
            value={formValues.name.value}
            onChange={handleChange}
            disabled={!isEditMode}
          />
          <span className='profile__input-error'>{formValues.name.validationMessage}</span>
        </label>
        <label className='profile__label'>
          E-mail
          <input
            name='email'
            type='email'
            className='profile__input'
            minLength='4'
            maxLength='40'
            required
            value={formValues.email.value}
            onChange={handleChange}
            disabled={!isEditMode}
          />
          <span className='profile__input-error'>{formValues.email.validationMessage}</span>
        </label>
        <span className={`profile__span${isSuccess ? '' : ' profile__span_error'}`}>{serverErrorMessage}</span>
        {isEditMode &&
          <>
            <button
              className='profile__button hover-button profile__button_type_submit'
              type="submit"
              disabled={toggleSubmit}
            >
              Сохранить
            </button>
          </>
        }
      </form>

      {!isEditMode &&
        <>
          <button
            className='profile__button profile__button_type_change hover-button'
            type="button"
            onClick={handleEditMode}
          >
            Редактировать
          </button>
          <button
            className='profile__button profile__button_type_logout hover-button'
            type='submit'
            onClick={onLogout}
          >
            Выйти из аккаунта
          </button>
        </>
      }
    </main>
  );
}

export default Profile;
