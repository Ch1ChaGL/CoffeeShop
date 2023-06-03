import React from 'react';
import { Link } from 'react-router-dom';
import {
  ABOUT_ROUTE,
  FAQ_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from '../../../utils/consts';
import s from './Navbar.module.css';
import CustomLink from '../CustomLink/CustomLink';

function Navbar() {
  return (
    <nav className={s.row}>
      <CustomLink to={MAIN_ROUTE}>
        <img src='/img/LOGO.png'></img>
      </CustomLink>
      <CustomLink to={MAIN_ROUTE}>Главная</CustomLink>
      <CustomLink to={ABOUT_ROUTE}>О нас</CustomLink>
      <CustomLink to={SHOP_ROUTE}>Купить</CustomLink>
      <CustomLink
        style={{
          marginRight: '230px',
        }}
        to={FAQ_ROUTE}
      >
        Обратная связь
      </CustomLink>
      <CustomLink to={LOGIN_ROUTE}>Вход</CustomLink>
      <CustomLink to={REGISTRATION_ROUTE}>Регистрация</CustomLink>
    </nav>
  );
}

export default Navbar;
