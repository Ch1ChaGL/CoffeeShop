import React from 'react';
import s from './Buy.module.css';
function MyButton({ text, ...props }) {
  return (
    <div className={s.buy} {...props}>
      {text}
    </div>
  );
}

export default MyButton;
