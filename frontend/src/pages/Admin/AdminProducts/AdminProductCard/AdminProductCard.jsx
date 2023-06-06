import React from 'react';
import s from './AdminProductCard.module.css';
import ProductService from '../../../../API/ProductService';
function AdminProductCard({ product, products, setProducts }) {
  const deleteProduct = event => {
    event.preventDefault();

    ProductService.deleteProduct(product.ProductId);
    setProducts(products.filter(p => p.ProductId !== product.ProductId));
  };

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
          <button className={s.buttonEdit}>Редактировать</button>
          <button className={s.buttonDelete} onClick={deleteProduct}>
            Удалить
          </button>
          <div className={s.price}>
            {new Intl.NumberFormat('ru-Ru', {
              style: 'currency',
              currency: 'RUB',
            }).format(product.Price)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductCard;
