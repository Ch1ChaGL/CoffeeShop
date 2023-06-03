import React from 'react';
import s from './Buy.module.css';
function MyButton({ text }) {
  return (
    <div className={s.buy}>
      {text}
    </div>
  );
}

export default MyButton;
