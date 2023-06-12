import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../..';
import { logout } from '../../../API/userAPI';
import { observer } from 'mobx-react-lite';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  FAQ_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from '../../../utils/consts';
import s from './Navbar.module.css';
import CustomLink from '../CustomLink/CustomLink';

const Navbar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const logautClick = () => {
    logout();
    user.setIsAuth(false);
    user.setUser({});
    navigate('/shop/all');
  };
  console.log('Роль юзера ' + user.getRole);
  return (
    <nav className={s.row}>
      <CustomLink to={MAIN_ROUTE}>
        <img src='/img/LOGO.png'></img>
      </CustomLink>
      <CustomLink to={MAIN_ROUTE}>Главная</CustomLink>
      <CustomLink to={SHOP_ROUTE + '/all'}>Купить</CustomLink>
      <CustomLink to={FAQ_ROUTE}>Обратная связь</CustomLink>

      {user.getRole === 1 ? (
        <button className={s.admin} onClick={() => navigate(ADMIN_ROUTE)}>
          Админ панель
        </button>
      ) : (
        <></>
      )}
      {user.isAuth ? <CustomLink to={BASKET_ROUTE}>Корзина</CustomLink> : <></>}
      {user.isAuth ? (
        <CustomLink to={PROFILE_ROUTE}>Профиль</CustomLink>
      ) : (
        <></>
      )}
      {user.isAuth ? (
        <button className={s.logout} onClick={logautClick}>
          Выход
        </button>
      ) : (
        <button className={s.login} onClick={() => navigate(LOGIN_ROUTE)}>
          Авторизация
        </button>
      )}
    </nav>
  );
});

export default Navbar;
