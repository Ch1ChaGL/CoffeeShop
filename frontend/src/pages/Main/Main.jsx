import React from 'react';
import s from './Main.module.css';
import Container from '../../components/Container/Container';
import { Link } from 'react-router-dom';
import { SHOP_ROUTE } from '../../utils/consts';

function Main() {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://forms.yandex.ru/_static/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Container>
      <div className={s.main}>
        <section className={s.hero}>
          <div className={s.heroContent}>
            <h1 className={s.heroTitle}>Цветочная Гармония</h1>
            <p className={s.heroText}>
              Превращаем ваши эмоции в изысканные цветочные композиции. Свежие
              цветы, креативные букеты и индивидуальный подход к каждому
              клиенту.
            </p>
            <Link to={SHOP_ROUTE + 'all'} className={s.heroButton}>
              Выбрать букет
            </Link>
          </div>
          <div className={s.heroDecoration}>
            <div className={s.flower}></div>
            <div className={s.leaf}></div>
          </div>
        </section>

        <section className={s.formSection}>
          <div className={s.formWrapper}>
            <h2 className={s.formTitle}>Не можете определиться?</h2>
            <p className={s.formSubtitle}>
              Пройдите наш тест и мы подберем идеальный цветок специально для
              вас
            </p>
            <div className={s.formContainer}>
              <iframe
                src='https://forms.yandex.ru/cloud/682e09c349363953a6f721e2/?iframe=1" frameborder="0'
                frameborder='0'
                name='ya-form-ваш_идентификатор_формы'
                className={s.formIframe}
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default Main;
