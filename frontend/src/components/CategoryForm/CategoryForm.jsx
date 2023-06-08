import React, { useState } from 'react';
import styles from './CategoryForm.module.css';
import CategoryService from '../../API/CategoryService';
function CategoryForm({ setVisible, fetchCategory }) {
  const [newCategory, setNewCategory] = useState({ Name: '', Description: '' });

  const click = async () => {
    await CategoryService.create(newCategory);
    setVisible(false);
    fetchCategory();
  };

  return (
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor='name'>Название:</label>
        <input
          type='text'
          id='name'
          placeholder='Введите название продукта'
          value={newCategory.Name}
          onChange={event =>
            setNewCategory({ ...newCategory, Name: event.target.value })
          }
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='description'>Описание:</label>
        <textarea
          placeholder='Введите описание продукта'
          id='description'
          value={newCategory.Description}
          onChange={event =>
            setNewCategory({ ...newCategory, Description: event.target.value })
          }
          required
        />
      </div>
      <div type='submit' className={styles.submitButton} onClick={click}>
        Создать
      </div>
    </form>
  );
}

export default CategoryForm;
