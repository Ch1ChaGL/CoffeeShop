import React from 'react';
import Container from '../../components/Container/Container';
import MyInput from '../../components/UI/MyInput/MyInput';
import s from './Admin.module.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import AdminSidebar from '../../components/UI/AdminSidebar/AdminSidebar';
import { useLocation } from 'react-router-dom';
import AdminProducts from './AdminProducts/AdminProducts';
import AdminCategory from './AdminCategory/AdminCategory';
import AdminOrders from './AdminOrders/AdminOrders';
function Admin() {
  const location = useLocation();
  const page = location.pathname.split('/').slice(-1)[0];

  let componentToRender;

  switch (page) {
    case 'products':
      componentToRender = <AdminProducts />;
      break;
    case 'category':
      componentToRender = <AdminCategory />;
      break;
    case 'orders':
      componentToRender = <AdminOrders />;
      break;
    default:
      componentToRender = <></>;
  }

  return (
    <Container>
      <div className={s.pageContainer}>
        <div className={s.sidebar}>
          <AdminSidebar />
        </div>
        <div className={s.contentBlock}>{componentToRender}</div>
      </div>
    </Container>
  );
}

export default Admin;
