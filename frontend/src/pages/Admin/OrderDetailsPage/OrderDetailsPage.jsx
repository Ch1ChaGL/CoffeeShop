import React, { useEffect, useState } from 'react';
import s from './OrderDetailsPage.module.css';
import Container from '../../../components/Container/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderService from '../../../API/OrderService';
import ProductService from '../../../API/ProductService';
import Card from './Card/Card';
import SaveModal from '../../../components/UI/SaveModal/SaveModal';
import { ADMIN_ROUTE } from '../../../utils/consts';
const OrderDetailsPage = () => {
  const location = useLocation();
  const orderId = parseInt(location.pathname.split('/').slice(-1)[0]);
  const [error, setError] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [products, setProducts] = useState([]);
  const [allCost, setAllCost] = useState(0);
  const [email, setEmail] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [orderStatus, setOrderStatus] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const response = await OrderService.getById(orderId);
    setOrderStatus(response[0].Status);
    const cost = await ProductService.getCosts(response[0].OrderProducts);
    setAllCost(cost);
    for (const item of response[0].OrderProducts) {
      const product = await ProductService.getProductById(item.ProductId);
      setProducts(prevProd => [
        ...prevProd,
        {
          ...product,
          Count: item.Count,
        },
      ]);
    }

    setEmail(response[0].User.Email);
    setFirstName(response[0].User.FirstName);
    setLastName(response[0].User.LastName);
    setAddress(response[0].Shop.Address);
  };
  const handleCloseOrder = async () => {
    try {
      await OrderService.close(orderId);
      setOrderStatus(1);
      setMessage('Заказ успешно закрыт');
      setIsSave(true);
      setError(false);
    } catch (err) {
      setIsSave(true);
      setMessage(err.response.data.message);
      setError(true);
    }
  };
  const handleCancellation = async () => {
    try {
      await OrderService.unclose(orderId);
      setOrderStatus(0);
      setMessage('Заказ успешно открыт');
      setIsSave(true);
      setError(false);
    } catch (err) {
      setIsSave(true);
      setMessage(err.response.data.message);
      setError(true);
    }
  };
  const deleteOrder = async () => {
    try {
      await OrderService.delete(orderId);
      navigate(ADMIN_ROUTE + '/orders');
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
    <Container>
      {isSave ? (
        <SaveModal setIsSave={setIsSave} error={error}>
          {message}
        </SaveModal>
      ) : null}
      <div className={s.container}>
        <div className={s.orderInfo}>
          <div className={s.field}>
            <span className={s.label}>Email:</span>
            <span className={s.value}>{email}</span>
          </div>
          <div className={s.field}>
            <span className={s.label}>Имя:</span>
            <span className={s.value}>{FirstName}</span>
          </div>
          <div className={s.field}>
            <span className={s.label}>Фамилия:</span>
            <span className={s.value}>{LastName}</span>
          </div>
          <div className={s.field}>
            <span className={s.label}>Адрес:</span>
            <span className={s.value}>{Address}</span>
          </div>
          <div className={s.field}>
            <span className={s.label}>Стоимость:</span>
            <span className={s.value}>
              {new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: 'RUB',
              }).format(allCost)}
            </span>
          </div>
        </div>
        {orderStatus === 1 ? (
          <button
            className={s.cancellation}
            onClick={handleCancellation}
            style={{ marginBottom: '20px' }}
          >
            Отмена
          </button>
        ) : (
          <button
            className={s.closeButton}
            onClick={handleCloseOrder}
            style={{ marginBottom: '20px' }}
          >
            Закрыть заказ
          </button>
        )}
        <button className={s.cancellation} onClick={deleteOrder}>
          Удалить
        </button>
        <h1 className={s.labelItems}>Позиции в заказе</h1>
        {products.map(product => (
          <Card product={product} key={product.ProductId} />
        ))}
      </div>
    </Container>
  );
};

export default OrderDetailsPage;
