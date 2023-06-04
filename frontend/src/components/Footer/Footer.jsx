import React from 'react';
import { Link } from 'react-router-dom';
import {
  ABOUT_ROUTE,
  FAQ_ROUTE,
  MAIN_ROUTE,
  SHOP_ROUTE,
} from '../../utils/consts';
function Footer() {
  return (
    <footer>
      <Link to={MAIN_ROUTE}>Главная</Link>
      <Link to={ABOUT_ROUTE}>О нас</Link>
      <Link to={SHOP_ROUTE}>Купить</Link>
      <Link to={FAQ_ROUTE}>Обратная связь</Link>
    </footer>
  );
}

export default Footer;
