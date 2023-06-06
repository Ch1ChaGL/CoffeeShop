import React from 'react';
import s from './AdminOrders.module.css';
import AdminOrder from '../AdminOrder/AdminOrder';

function AdminOrders() {
  return (
    <div>
      <AdminOrder />
      <AdminOrder />
      <AdminOrder />
    </div>
  );
}

export default AdminOrders;
