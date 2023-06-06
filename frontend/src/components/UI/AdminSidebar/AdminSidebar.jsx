import React from 'react';
import { Link } from 'react-router-dom';
import s from './AdminSidebar.module.css';
import { ADMIN_ROUTE } from '../../../utils/consts';
import { adminRoutes } from '../../../router';

function AdminSidebar() {
  return (
    <div className={s.container}>
      {adminRoutes
        .filter(route => route.name)
        .map((route) => {
          return (
            <Link key={route.path} to={route.path} className={s.link}>
              {route.name}
            </Link>
          );
        })}
    </div>
  );
}

export default AdminSidebar;
