import React, { useState, useEffect } from 'react';
import s from './ChangeProduct.module.css';
import { useLocation } from 'react-router-dom';
import ProductService from '../../../../../API/ProductService';
import Container from '../../../../../components/Container/Container';
import CategoryService from '../../../../../API/CategoryService';
import Spinner from '../../../../../components/UI/Spinner/Spinner';
import ShopCard from './ShopCard/ShopCard';
import ShopService from '../../../../../API/ShopService';
import SaveModal from '../../../../../components/UI/SaveModal/SaveModal';
function ChangeProduct() {
  const location = useLocation();
  const id = parseInt(location.pathname.split('/').slice(-1)[0]);
  const [isSave, setIsSave] = useState(false);
  const [product, setProduct] = useState({
    ProductId: '',
    Name: '',
    Price: 0,
    CategoryId: 0,
    Description: '',
    Img: '',
  });
  const [categorys, setCategories] = useState([]);
  const [shops, setShops] = useState([]);

  async function getCategories() {
    const categorys = await CategoryService.getAllCategory();
    setCategories(categorys);
  }
  const fetchShops = async () => {
    const shops = await ShopService.getAllShops();
    setShops(shops);
  };
  useEffect(() => {
    fetchProduct(id);
    getCategories();
    fetchShops();
  }, []);

  const fetchProduct = async id => {
    console.log('Fetching product');
    const product = await ProductService.getProductById(id);
    setProduct(product);
  };

  const save = async () => {
    console.log(typeof selectedCategory === 'string');
    await console.log(product);
    await ProductService.updateProduct(product);
    fetchProduct(id);
    setIsSave(true);
  };
  if (!product.Img) {
    return <Spinner />;
  }

  return (
    <Container>
      {isSave ? (
        <SaveModal setIsSave={setIsSave}>Успешно сохранено!</SaveModal>
      ) : null}
      <div className={s['container']}>
        <div className={s['image']}>
          <img
            src={process.env.REACT_APP_API_URL + product.Img}
            alt='Product'
          />
        </div>
        <div className={s['content']}>
          <div className={s['inputGroup']}>
            <label htmlFor='name'>Название:</label>
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
            <label htmlFor='description'>Описание:</label>
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
            <label htmlFor='price'>Цена:</label>
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
          <div className={s['inputGroup']}>
            <label htmlFor='category'>Категория:</label>
            <div className={s.selectWrapper}>
              <select
                id='category'
                value={product.CategoryId}
                onChange={event =>
                  setProduct({
                    ...product,
                    CategoryId: parseInt(event.target.value),
                  })
                }
                required
                className={s.selectField}
              >
                {categorys.map(category => (
                  <option value={category.CategoryId} key={category.CategoryId}>
                    {category.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className={s['saveButton']} onClick={save}>
            Сохранить
          </button>
        </div>
      </div>
      {shops.map(shop => (
        <ShopCard shop={shop} product={product} key={shop.ShopId} />
      ))}
    </Container>
  );
}

export default ChangeProduct;
