import React from 'react';
import { Link } from 'react-router-dom';
import s from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={s.container}>
      <a className={s.link}>
        Зерновой кофе
      </a>
      <a className={s.link}>
        Молотый кофе
      </a>
      <a className={s.link}>
        Кофе в капсулах
      </a>
      <a className={s.link}>
        Сувениры
      </a>
    </div>
  );
}

export default Sidebar;
