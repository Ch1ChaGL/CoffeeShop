import React from 'react';
import s from './Footer.module.css';
import Container from '../Container/Container';
import FooterNav from './FooterNav/FooterNav';
function Footer() {
  return (
    <footer className={s.footer}>
      <Container>
        <FooterNav />
      </Container>
    </footer>
  );
}

export default Footer;
