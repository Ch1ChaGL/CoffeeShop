import React, { useState, useContext, useEffect } from 'react';
import s from './BasketCard.module.css';
import ProductService from '../../../API/ProductService';
import { Context } from '../../..';
function BasketCard({
  products,
  product,
  deleteFromBasket,
  updateBasket,
  setProducts,
  fetchTotalCost,
}) {
  const { user } = useContext(Context);
  const [count, setCount] = useState(parseInt(product.Count));
  const plus = async () => {
    setCount(parseInt(count) + 1);
    await updateBasket(product, count + 1);
    setProducts(user.getbasket);
    fetchTotalCost(user.getbasket);
  };
  const minus = async () => {
    if (count - 1 <= 0) return;
    setCount(count - 1);
    await updateBasket(product, count - 1);
    setProducts(user.getbasket);
    fetchTotalCost(user.getbasket);
  };
  const deletePosition = () => {
    console.log('product.ProductId');
    console.log(product.ProductId);
    deleteFromBasket(product.ProductId);
    console.log(products.filter(p => p.ProductId !== product.ProductId));
    console.log('user.getbasket');
    console.log(user.getbasket);
    setProducts(products.filter(p => p.ProductId !== product.ProductId));
    fetchTotalCost(user.getbasket);
  };

  useEffect(() => {
    updateBasket(product, count);
    fetchTotalCost(user.getbasket);
  }, [count]);
  const onChange = async e => {
    setCount(parseInt(e.target.value));
  };
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
          <div className={s.container}>
            <button className={`${s.button} ${s.minus}`} onClick={minus}>
              -
            </button>
            <input
              type='number'
              className={s.countInOrder}
              value={count}
              onChange={onChange}
              min={'1'}
            />
            <button className={`${s.button} ${s.plus}`} onClick={plus}>
              +
            </button>
            <button
              className={`${s.buttonDelete} ${s.button}`}
              onClick={deletePosition}
            >
              Удалить
            </button>
          </div>

          <div className={s.rightContent}>
            <div className={s.price}>
              {new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: 'RUB',
              }).format(product.Price * count)}
            </div>
            <div className={s.count}>{count} шт.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketCard;
