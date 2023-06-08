import React, { useState, useEffect } from 'react';
import s from './ShopCard.module.css';
import StockService from '../../../../../../API/StockService';
import SaveModal from '../../../../../../components/UI/SaveModal/SaveModal';
function ShopCard({ shop, product }) {
  const [count, setCount] = useState(0);
  const [isSave, setIsSave] = useState(false);
  useEffect(() => {
    fetchStock();
    console.log(count);
  }, []);

  const fetchStock = async () => {
    const count = await StockService.getCountProductByIdShopAndProduct(
      shop.ShopId,
      product.ProductId,
    );
    console.log('Я тут ' + count);
    setCount(count);
  };

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  const saveCount = async () => {
    await StockService.updateCount(shop.ShopId, product.ProductId, count);
    setIsSave(true);
  };

  return (
    <>
      {isSave ? <SaveModal setIsSave={setIsSave} /> : null}
      <div className={s['shopsContainer']}>
        <div className={s['shops']}>
          <div className={s['address']}>{shop.Address}</div>
          <div className={s['count']}>
            <button onClick={decreaseCount} className={s['minus']}>
              -
            </button>
            <input
              type='number'
              value={count}
              onChange={event => setCount(event.target.value)}
            />
            <button onClick={increaseCount} className={s['plus']}>
              +
            </button>
          </div>
          <button className={s['saveCount']} onClick={saveCount}>
            Сохранить
          </button>
        </div>
      </div>
    </>
  );
}

export default ShopCard;
