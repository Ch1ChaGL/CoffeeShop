import React from 'react';
import s from './Card.module.css';
function Card({ product }) {
  return (
    <div className={s.card}>
      <img
        src={process.env.REACT_APP_API_URL + product.Img}
        alt={product.name}
        className={s.image}
      />
      <div className={s.content}>
        <h3 className={s.name}>{product.Name}</h3>
        <p className={s.description}>{product.Description}</p>
        <div className={s.buttons}>
          <div></div>
          <div className={s.rightContent}>
            <div className={s.price}>
              {new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: 'RUB',
              }).format(product.Price * product.Count)}
            </div>
            <div className={s.count}>{product.Count} шт.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
