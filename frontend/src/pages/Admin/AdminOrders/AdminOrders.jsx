import React, { useEffect, useState } from 'react';
import s from './AdminOrders.module.css';
import AdminOrderCard from './AdminOrderCard/AdminOrderCard';
import OrderService from '../../../API/OrderService';
import MyInput from '../../../components/UI/MyInput/MyInput';
import { useOrders } from '../../../hooks/useOrders';
function AdminOrders() {
  const [sort, setSort] = useState('all');
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const orders = await OrderService.getAllOrder();
    setOrders(orders);
  };
  const sortedOrders = useOrders(orders, searchQuery, sort);

  return (
    <div>
      <MyInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className={s.buttons}>
        <div
          className={`${s.newOrder} ${s.button}`}
          onClick={() => setSort('open')}
        >
          Открытые заказы
        </div>
        <div
          className={`${s.oldOrder} ${s.button}`}
          onClick={() => setSort('close')}
        >
          Закрытые заказы
        </div>
        <div className={`${s.all} ${s.button}`} onClick={() => setSort('all')}>
          Все заказы
        </div>
      </div>
      <div className={s.orders}>
        {sortedOrders.map(order => {
          return <AdminOrderCard key={order.OrderId} order={order} />;
        })}
      </div>
    </div>
  );
}

export default AdminOrders;
