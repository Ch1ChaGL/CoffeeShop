import React from 'react';
import s from './Spinner.module.css';

function Spinner() {
  return (
    <div className={s['spinner-overlay']}>
      <div className={s['spinner-container']} />
    </div>
  );
}

export default Spinner;
