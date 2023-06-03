import React from 'react';
import s from './MyInput.module.css';

function MyInput(props) {
  return (
    <div className={s.search}>
      <input {...props} className={s.input} />
      <img src='./img/loupe.png' className={s.searchIcon}/>
    </div>
  );
}

export default MyInput;
