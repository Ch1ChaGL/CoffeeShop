import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import s from './CustomLink.module.css';
function CustomLink({ children, to, ...props }) {
  const match = useMatch(to);
  return (
    <Link
      to={to}
      {...props}
      className={
        match ? `${s.activeLink} + ${s.link}` : `${s.simpleLink} + ${s.link}`
      }
    >
      {children}
    </Link>
  );
}

export default CustomLink;
