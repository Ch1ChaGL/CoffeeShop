import React, { useState, useEffect } from 'react';
import s from './ChangeProduct.module.css';
import { useLocation } from 'react-router-dom';
import ProductService from '../../../../../API/ProductService';
import Container from '../../../../../components/Container/Container';
function ChangeProduct() {
  const location = useLocation();
  const id = parseInt(location.pathname.split('/').slice(-1)[0]);

  const [product, setProduct] = useState({
    ProductId: '',
    Name: '',
    Price: 0,
    CategoryId: 0,
    Description: '',
    Img: '',
  });

  useEffect(() => {
    fetchProduct(id);
  }, []);
  const fetchProduct = async id => {
    const product = await ProductService.getProductById(id);
    setProduct(product);
  };

  return (
    <Container>
      {' '}
      <div className={s['container']}>
        <div className={s['image']}>
          <img
            src={process.env.REACT_APP_API_URL + product.Img}
            alt='Product'
          />
        </div>
        <div className={s['content']}>
          <div className={s['inputGroup']}>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              placeholder='Enter product name'
              value={product.Name}
              onChange={event =>
                setProduct({ ...product, Name: event.target.value })
              }
            />
          </div>
          <div className={s['inputGroup']}>
            <label htmlFor='description'>Description:</label>
            <textarea
              id='description'
              placeholder='Enter product description'
              value={product.Description}
              onChange={event =>
                setProduct({ ...product, Description: event.target.value })
              }
            ></textarea>
          </div>
          <div className={s['inputGroup']}>
            <label htmlFor='price'>Price:</label>
            <input
              type='number'
              id='price'
              placeholder='Enter product price'
              value={product.Price}
              onChange={event =>
                setProduct({ ...product, Price: parseInt(event.target.value) })
              }
            />
          </div>
          <button className={s['saveButton']}>Save</button>
        </div>
      </div>
    </Container>
  );
}

export default ChangeProduct;
