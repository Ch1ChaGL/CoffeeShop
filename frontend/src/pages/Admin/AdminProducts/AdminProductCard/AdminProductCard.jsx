import React from 'react';
import s from './AdminProductCard.module.css';
function AdminProductCard({ product }) {
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
          <button className={s.buttonEdit}>Редактировать</button>
          <button className={s.buttonDelete}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

export default AdminProductCard;
