import React from 'react';
import s from './Main.module.css';
import Container from '../../components/Container/Container';
import { Link } from 'react-router-dom';
import { SHOP_ROUTE } from '../../utils/consts';

function Main() {
  return (
    <Container>
      <div className={s['main-screen']} id='main-screen'>
        <div className={s['container']}>
          <div className={s['main-screen_row']}>
            <div className={s['main-card']}>
              <div className={s['main-card__row']}>
                <div className={s['main-card__title']}>
                  <h1>The Best Coffee For You</h1>
                </div>
                <div className={s['main-card__subtitle']}>
                  <p>
                    Добро пожаловать в наш интернет-магазин кофе, где ваше утро
                    начнется с аромата и вкуса истинного наслаждения! Мы
                    предлагаем вам широкий выбор высококачественных сортов кофе,
                    чтобы удовлетворить даже самых изысканных любителей этого
                    напитка
                  </p>
                </div>
                <Link
                  to={SHOP_ROUTE + 'all'}
                  className={s['main-card__button']}
                >
                  В магазин
                </Link>
              </div>
            </div>
            <div className={s['main-image']}>
              <img src='/img/2.jpg' alt='' />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Main;
