import React from 'react';
import s from './ProducrCard.module.css';
import Buy from '../../UI/MyButton/Buy';
function ProductCard({ product }) {
  return (
    <div className={s.container}>
      <div className={s.productImage}>
        <img className={s.img} src={product.Img} />
      </div>
      <div className={s.name}>{product.Name}</div>
      <div className={s.description}>{product.Description}</div>
      <div className={s.offer}>
        <div className={s.price}>
          {new Intl.NumberFormat('ru-Ru', {
            style: 'currency',
            currency: 'RUB',
          }).format(product.Price)}
        </div>
        <Buy text={'Купить'} />
      </div>
    </div>
  );
}

export default ProductCard;
