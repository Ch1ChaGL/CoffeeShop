import React, { useEffect, useState } from 'react';
import s from './AdminShops.module.css';
import ShopCard from './ShopCard/ShopCard';
import ShopService from '../../../API/ShopService';
import ShopForm from './ShopForm/ShopForm';
import MyModal from '../../../components/UI/MyModal/MyModal';
function AdminShops() {
  const [modal, setModal] = useState(false);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetchShops();
  }, []);
  const fetchShops = async () => {
    const response = await ShopService.getAllShops();
    setShops(response);
  };
  return (
    <div>
      <MyModal visible={modal} setVisible={setModal}>
        <ShopForm setVisible={setModal} fetchShops={fetchShops} />
      </MyModal>
      <button className={s.add} onClick={() => setModal(true)}>
        Добавить
      </button>
      {shops.map(shop => (
        <ShopCard
          key={shop.ShopId}
          shop={shop}
          shops={shops}
          setShops={setShops}
        />
      ))}
    </div>
  );
}

export default AdminShops;
