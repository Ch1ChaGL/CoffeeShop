import React from 'react';
import s from './Main.module.css';
import Container from '../../components/Container/Container';
import { Link } from 'react-router-dom';
import { SHOP_ROUTE } from '../../utils/consts';

function Main() {
  // Эффект для загрузки скрипта Яндекс.Форм
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://forms.yandex.ru/_static/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
          
          {/* Секция с формой */}
          <div className={s['form-section']}>
            <h2 className={s['form-title']}>Обратная связь</h2>
            <p className={s['form-description']}>
              Оставьте ваши вопросы или пожелания, и мы с вами свяжемся
            </p>
            <div className={s['yandex-form']}>
              <iframe 
                src="https://forms.yandex.ru/u/682c38c2505690a46eddae7d?iframe=1" 
                frameBorder="0" 
                name="ya-form-682c38c2505690a46eddae7d" 
                width="100%" 
                height="500"
                title="Форма обратной связи"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Main;