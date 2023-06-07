import React, { useState, useEffect } from 'react';
import s from './AdminProductCard.module.css';
import ProductService from '../../../../API/ProductService';
import StockService from '../../../../API/StockService';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../../../utils/consts';
function AdminProductCard({ product, products, setProducts }) {
  const navigate = useNavigate();
  const deleteProduct = event => {
    event.preventDefault();

    ProductService.deleteProduct(product.ProductId);
    setProducts(products.filter(p => p.ProductId !== product.ProductId));
  };
  const [count, setCount] = useState(0);
  const fetchCount = async id => {
    const count = await StockService.getAllCountProductByIdProduct(id);
    setCount(count);
  };

  useEffect(() => {
    fetchCount(product.ProductId);
  }, []);

  return (
    <div className={s.card}>
      <img
        src={process.env.REACT_APP_API_URL + product.Img}
        alt={product.name}
        className={s.image}
      />
      <div className={s.content}>
        <h3 className={s.name}>{product.Name}</h3>
        <p className={s.description}>{product.Description}</p>
        <div className={s.buttons}>
          <div>
            <button
              className={s.buttonEdit}
              onClick={() =>
                navigate(ADMIN_ROUTE + `/products/${product.ProductId}`)
              }
            >
              Редактировать
            </button>
            <button className={s.buttonDelete} onClick={deleteProduct}>
              Удалить
            </button>
          </div>
          <div className={s.rightContent}>
            <div className={s.price}>
              {new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: 'RUB',
              }).format(product.Price)}
            </div>
            <div className={s.count}>{count} шт.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductCard;
