import React from 'react';
import './Preloader.css';

const Preloader = ({isFull}) => {

  return (
    <div className={`preloader${isFull ? " preloader_fullscreen" : ""}`}>
      <div className='preloader__container'>
        <span className='preloader__round'></span>
      </div>
    </div>
  );
};

export default Preloader;
