function AboutProject() {
  return (
    <section className='about'>
      <h2 className='about__main-title'>О проекте</h2>

      <div
        id='about'
        className='about__project'
      >
        <div className='about__description'>
          <h3 className='about__title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>

        <div className='about__description'>
          <h3 className='about__title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className='about__timeline'>
        <p className='about__line-segment about__line-segment_type_short'>
          1 неделя
        </p>
        <p className='about__line-segment about__line-segment_type_long'>
          4 недели
        </p>
        <p className='about__part'>Back-end</p>
        <p className='about__part'>Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
