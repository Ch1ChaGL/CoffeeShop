import React, { useEffect, useState } from 'react';
import s from './AdminOrderCard.module.css';
import ShopService from '../../../../API/ShopService';
import ProductService from '../../../../API/ProductService';
import { getUserById } from '../../../../API/userAPI';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../../../utils/consts';

function AdminOrder({ order }) {
  const [address, setAddress] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderCost, setOrderCost] = useState(0);
  const navigate = useNavigate();
  const isoDate = order.createdAt;
  const date = new Date(isoDate);

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
    fetchCustomerEmail();
    fetchCost();
  }, []);

  const fetchAddress = async () => {
    const response = await ShopService.getShopById(order.ShopId);
    setAddress(response.Address);
  };
  const fetchCustomerEmail = async () => {
    const response = await getUserById(order.UserId);
    setCustomerEmail(response.Email);
  };
  const fetchCost = async () => {
    const costs = await ProductService.getCosts(order.OrderProducts);
    setOrderCost(costs);
  };

  return (
    <div className={s.card}>
      <div className={s.content}>
        <div>
          <h3 className={s.name}>Заказ номер: {order.OrderId}</h3>
          <p className={s.description}>Адрес: {address}</p>
          <p className={s.description}>Email: {customerEmail}</p>
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
        <div className={s.buttons}>
          <div>
            <button
              className={s.check}
              onClick={() => navigate(ADMIN_ROUTE + `/orders/${order.OrderId}`)}
            >
              Просмотреть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrder;
