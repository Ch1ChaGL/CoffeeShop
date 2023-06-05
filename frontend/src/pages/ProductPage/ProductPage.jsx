import React from 'react';
import s from './ProductPage.module.css';
import Buy from '../../components/UI/MyButton/Buy';
import { useLocation } from 'react-router-dom';
import ProductService from '../../API/ProductService';
import { useState, useEffect } from 'react';

function ProductPage() {
  const [product, setProduct] = useState({});
  const location = useLocation();
  const id = parseInt(location.pathname.split('/').slice(-1)[0]);

  useEffect(() => {
    console.log('Число' + id);
    fetchProduct(id);
  }, []);

  async function fetchProduct(id) {
    const products = await ProductService.getProductById(id);
    setProduct(products);
  }

  return (
    <div className={s['container']}>
      <div className={s['product']}>
        <div className={s['product-image']}>
          <img
            src={process.env.REACT_APP_API_URL + product.Img}
            alt='Product Image'
          />
        </div>
        <div className={s['product-details']}>
          <h2 className={s['product-name']}>{product.Name}</h2>
          <p className={s['product-description']}>{product.Description}</p>
          <div className={s.offer}>
            <div className={s.price}>
              {new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: 'RUB',
              }).format(product.Price)}
            </div>
            <Buy text={'Купить'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
