import React, { useState, useEffect } from 'react';
import s from './OrderHistoryCard.module.css';
import ShopService from '../../../../API/ShopService';
import ProductService from '../../../../API/ProductService';
function OrderHistoryCard({ order }) {
  const [orderCost, setOrderCost] = useState(0);
  const isoDate = order.createdAt;
  const date = new Date(isoDate);
  const [address, setAddress] = useState('');
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Europe/Moscow', // Укажите нужную вам временную зону
  };

  const formattedDate = date.toLocaleString('ru-RU', options);

  useEffect(() => {
    fetchAddress();
    fetchCost();
  }, []);

  const fetchAddress = async () => {
    const response = await ShopService.getShopById(order.ShopId);
    setAddress(response.Address);
  };
  const fetchCost = async () => {
    const costs = await ProductService.getCosts(order.OrderProducts);
    setOrderCost(costs);
  };

  return (
    <div className={s.card}>
      <div className={s.content}>
        <div className={s.about}>
          <h3 className={s.name}>Заказ номер: {order.OrderId}</h3>
          <p className={s.description}>Адрес: {address}</p>
        </div>
        <div className={s.status}>
          {order.Status === 0 ? (
            <div style={{ color: 'green' }}> Статус: Открыт</div>
          ) : (
            <div style={{ color: 'red' }}> Статус: Закрыт</div>
          )}
        </div>
        <div className={s.date}>Дата создания: {formattedDate}</div>
        <div className={s.cost}>
          {new Intl.NumberFormat('ru-Ru', {
            style: 'currency',
            currency: 'RUB',
          }).format(orderCost)}
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryCard;
