import './Tech.css';

function Tech() {
  return (
    <section
      id='tech'
      className='tech'
    >
      <h2 className='tech__title'>Технологии</h2>
      <h3 className='tech__subtitle'>7 технологий</h3>
      <p className='tech__text'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className='tech__list'>
        <li className='tech__item'>HTML</li>
        <li className='tech__item'>CSS</li>
        <li className='tech__item'>JS</li>
        <li className='tech__item'>React</li>
        <li className='tech__item'>Git</li>
        <li className='tech__item'>Express.js</li>
        <li className='tech__item'>mongoDB</li>
      </ul>
    </section>
  );
}

export default Tech;
