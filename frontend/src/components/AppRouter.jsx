import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes, authRoutes } from '../router';
import { SHOP_ROUTE } from '../utils/consts';
import { useContext } from 'react';
import { AuthContext } from '../context';

function AppRouter() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  return (
    <Routes>
      {isAuth &&
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
