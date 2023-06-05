import React from 'react';
import s from './ProducrCard.module.css';
import Buy from '../../UI/MyButton/Buy';
import { Link } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../../../utils/consts';
function ProductCard({ product }) {
  return (
    <Link className={s.container} to={PRODUCT_ROUTE + `/${product.ProductId}`}>
      <div className={s.productImage}>
        <img
          className={s.img}
          src={process.env.REACT_APP_API_URL + product.Img}
        />
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
    </Link>
  );
}

export default ProductCard;
