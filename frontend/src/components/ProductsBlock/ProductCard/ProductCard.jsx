import React, { useContext, useState } from 'react';
import s from './ProducrCard.module.css';
import Buy from '../../UI/MyButton/Buy';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../../utils/consts';
import { Context } from '../../..';
import { authRoutes } from '../../../router';
function ProductCard({ product }) {
  const { user } = useContext(Context);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const click = () => {
    if (user.isAuth === false) {
      navigate(LOGIN_ROUTE);
      return;
    }
    user.addToBasket(product, count);
  };

  return (
    <div className={s.container}>
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
        <div className={s.buyGroup}>
          <input
            type='number'
            min='1'
            value={count}
            onChange={e => setCount(e.target.value)}
            className={s.count}
          />
          <Buy text={'Купить'} onClick={click} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
