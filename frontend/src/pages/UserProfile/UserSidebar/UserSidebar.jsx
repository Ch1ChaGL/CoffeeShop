import React from 'react';
import s from './UserSidebar.module.css';
import { authRoutes } from '../../../router';
import { Link } from 'react-router-dom';
function UserSidebar() {
  return (
    <div className={s.container}>
      {authRoutes
        .filter(route => route.name)
        .map(route => {
          return (
            <Link key={route.path} to={route.path} className={s.link}>
              {route.name}
            </Link>
          );
        })}
    </div>
  );
}

export default UserSidebar;
