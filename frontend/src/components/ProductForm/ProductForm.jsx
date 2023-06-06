import React, { useState, useEffect } from 'react';
import styles from './ProductForm.module.css';
import CategoryService from '../../API/CategoryService';
import ProductService from '../../API/ProductService';

function ProductForm({ setVisible, fetchProducts }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const [categorys, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  useEffect(() => {
    getCategories();
    console.log('categorys');
    console.log(categorys);
  }, []);

  async function getCategories() {
    const category = await CategoryService.getAllCategory();
    setCategories(category);
  }

  const createProduct = event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Description', description);
    formData.append('Price', price);
    formData.append('CategoryId', category);
    formData.append('Img', image);
    ProductService.createProduct(formData)
      .catch(err => console.log(err))
      .finally(() => {
        setVisible(false);
        fetchProducts();
      });
  };
  const handleSubmit = async event => {
    event.preventDefault();

    console.log(name, description, price, parseInt(category), image);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor='name'>Название:</label>
        <input
          type='text'
          id='name'
          placeholder='Введите название продукта'
          value={name}
          onChange={event => setName(event.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='description'>Описание:</label>
        <textarea
          placeholder='Введите описание продукта'
          id='description'
          value={description}
          onChange={event => setDescription(event.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='price'>Цена:</label>
        <input
          placeholder='Введите цену продукта'
          type='number'
          id='price'
          value={price}
          onChange={event => setPrice(event.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='category'>Категория:</label>
        <div className={styles.selectWrapper}>
          <select
            id='category'
            value={category}
            onChange={event => setCategory(event.target.value)}
            required
            className={styles.selectField}
          >
            <option value=''>Выберите категорию</option>
            {categorys.map(category => (
              <option value={category.CategoryId} key={category.CategoryId}>
                {category.Name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='image'>Фото:</label>
        <input
          type='file'
          id='image'
          accept='image/*'
          onChange={event => setImage(event.target.files[0])}
          required
        />
      </div>
      <button
        type='submit'
        className={styles.submitButton}
        onClick={createProduct}
      >
        Создать
      </button>
    </form>
  );
}

export default ProductForm;
