import React from 'react';
import Navbar from '../UI/Navbar/Navbar';
import Container from '../Container/Container';
import s from './Header.module.css';
function Header() {
  return (
    <header className={s.header}>
      <Container>
        <Navbar />
      </Container>
    </header>
  );
}

export default Header;
