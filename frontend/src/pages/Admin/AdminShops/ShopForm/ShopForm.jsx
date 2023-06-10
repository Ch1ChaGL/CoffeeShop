import React, { useState } from 'react';
import styles from './ShopForm.module.css';
import ShopService from '../../../../API/ShopService';

function ShopForm({ setVisible, fetchShops }) {
  const [newShop, setNewShop] = useState({ Address: '' });
  const click = async () => {
    await ShopService.createShop(newShop);
    setVisible(false);
    fetchShops();
  };

  return (
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor='name'>Адрес:</label>
        <input
          type='text'
          id='name'
          value={newShop.Address}
          onChange={event =>
            setNewShop({ ...newShop, Address: event.target.value })
          }
          placeholder='Введите Адрес магазина'
          required
        />
      </div>
      <div className={styles.submitButton} onClick={click}>
        Создать
      </div>
    </form>
  );
}

export default ShopForm;
