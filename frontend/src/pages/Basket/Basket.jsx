import React, { useContext, useState, useEffect } from 'react';
import s from './Basket.module.css';
import { Context } from '../..';
import BasketCard from './BasketCard/BasketCard';
import Container from '../../components/Container/Container';
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../../utils/consts';
import ProductService from '../../API/ProductService';
function Basket() {
  const { user } = useContext(Context);
  const [products, setProducts] = useState(user.getbasket);
  const [total, setTotal] = useState(0);
  console.log();
  const navigate = useNavigate();
  useEffect(() => {
    fetchTotalCost(products);
  }, []);

  const fetchTotalCost = async products => {
    const total = await ProductService.getCosts(products);
    setTotal(total);
  };

  return (
    <Container>
      {products.length !== 0 ? (
        <div>
          <h1 className={s.title}>Корзина товаров</h1>
          {products.map(product => (
            <BasketCard
              key={product.ProductId}
              product={product}
              deleteFromBasket={user.deleteFromBasket.bind(user)}
              updateBasket={user.updateBasket.bind(user)}
              products={products}
              fetchTotalCost={fetchTotalCost}
              setProducts={setProducts}
            />
          ))}
          <h1 className={s.total}>
            Итого...<span className={s.totalPrice}>{new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: 'RUB',
              }).format(total)}</span>
          </h1>
        </div>
      ) : (
        <div className={s.content}>
          <h1 className={s.nothing}>
            В корзине сейчас ничего нет, пора что-то прикупить
          </h1>
          <button
            className={s.button}
            onClick={() => navigate(SHOP_ROUTE + '/all')}
          >
            Купить
          </button>
        </div>
      )}
    </Container>
  );
}

export default Basket;
