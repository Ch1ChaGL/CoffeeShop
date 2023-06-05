import React from 'react';
import { Link } from 'react-router-dom';
import s from './FooterNav.module.css';
import {
  ABOUT_ROUTE,
  FAQ_ROUTE,
  MAIN_ROUTE,
  SHOP_ROUTE,
} from '../../../utils/consts';
function FooterNav() {
  return (
    <nav className={s.footerRow}>
      <Link to={MAIN_ROUTE} className={s.link}>
        Главная
      </Link>
      <Link to={ABOUT_ROUTE} className={s.link}>
        О нас
      </Link>
      <Link to={SHOP_ROUTE + '/all'} className={s.link}>
        Купить
      </Link>
      <a href='https://github.com/Ch1ChaGL' className={s.link}>
        Create by Ch1ChaGL
      </a>
    </nav>
  );
}

export default FooterNav;
