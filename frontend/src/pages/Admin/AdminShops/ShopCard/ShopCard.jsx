import React from 'react';
import s from './ShopCard.module.css';
import ShopService from '../../../../API/ShopService';
function ShopCard({ shop, shops, setShops }) {
  const click = async () => {
    await ShopService.deleteShop(shop.ShopId);
    setShops(shops.filter(s => s.ShopId !== shop.ShopId));
  };

  return (
    <div className={s.card}>
      <div className={s.content}>
        <div>
          <h3 className={s.name}>{shop.Address}</h3>
        </div>
        <div className={s.buttons}>
          <div>
            <button className={s.buttonDelete} onClick={click}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCard;
