import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../..';
import s from './OrdersHistory.module.css';
import OrderService from '../../../API/OrderService';
import OrderHistoryCard from './OrderHistoryCard/OrderHistoryCard';
function OrdersHistory() {
  const { user } = useContext(Context);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    console.log(user.user.UserId);
    console.log(user.user);
    const response = await OrderService.getAllOrderByUserId(
      user.user.UserId,
      user.user,
    );
    setOrders(response);
  };

  return (
    <div>
      {orders.map(order => (
        <OrderHistoryCard order={order} />
      ))}
    </div>
  );
}

export default OrdersHistory;
