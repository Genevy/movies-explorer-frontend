import './NotFound.css';

function NotFound({ goBack }) {

  return (
    <main className='not-found'>
      <h2 className='not-found__title'>404</h2>
      <p className='not-found__subtitle'>Страница не найдена</p>
      <button
        className='not-found__button-return'
        type='button'
        onClick={goBack}
      >
        Назад
      </button>
    </main>
  );
}

export default NotFound;
