import React, { useEffect, useState } from 'react';
import styles from './BasketForm.module.css';
import ShopService from '../../../API/ShopService';
import OrderService from '../../../API/OrderService';
function BasketForm({
  setVisible,
  user,
  setBought,
  price,
  setIsSave,
  setError,
  setMessage,
}) {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const handleRadioChange = event => {
    const shopId = parseInt(event.target.value);
    setSelectedShop(shopId);
  };

  const click = async () => {
    try {
      setError(false);
      setBought(true);
      setVisible(false);
      const order = {
        ShopId: selectedShop,
        UserId: user.user.UserId,
        Products: user.getbasket,
      };
      await OrderService.createOrder(order);
      user.deleteFromBasket();
    } catch (err) {
      setIsSave(true);
      setError(true);
      setMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);
  const fetchShops = async () => {
    const response = await ShopService.getAllShops();
    setSelectedShop(response[0].ShopId);
    setShops(response);
  };
  return (
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <div className={styles.container}>
          <h1 className={styles.title}>Выберите пункт получения:</h1>
          {shops.map(shop => (
            <div key={shop.ShopId} className={styles.radioContainer}>
              <input
                type='radio'
                id={`shop-${shop.ShopId}`}
                name='shop'
                value={shop.ShopId}
                checked={selectedShop === shop.ShopId}
                onChange={handleRadioChange}
              />
              <label htmlFor={`shop-${shop.ShopId}`} className={styles.label}>
                {shop.Address}
              </label>
            </div>
          ))}
          <h1 className={styles.title}>
            Окончательная сумма заказа:{' '}
            {new Intl.NumberFormat('ru-Ru', {
              style: 'currency',
              currency: 'RUB',
            }).format(price)}
          </h1>
        </div>
      </div>
      <div className={styles.submitButton} onClick={click}>
        Заказать
      </div>
    </form>
  );
}

export default BasketForm;
