import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes, authRoutes } from '../router';
import { SHOP_ROUTE } from '../utils/consts';
import { useContext } from 'react';
import { Context } from '..';

function AppRouter() {
  const { user } = useContext(Context);
  console.log(user);
  console.log('авторизирован ли пользователь?', user.isAuth);
  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      {publicRoutes.map(route => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
      <Route path='*' element={<Navigate replace to={SHOP_ROUTE + '/all'} />} />
    </Routes>
  );
}

export default AppRouter;
