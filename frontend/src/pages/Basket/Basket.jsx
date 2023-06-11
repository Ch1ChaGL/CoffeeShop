import React, { useContext, useState, useEffect } from 'react';
import s from './Basket.module.css';
import { Context } from '../..';
import BasketCard from './BasketCard/BasketCard';
import Container from '../../components/Container/Container';
import { useNavigate } from 'react-router-dom';
import { BASKET_ROUTE, SHOP_ROUTE } from '../../utils/consts';
import ProductService from '../../API/ProductService';
import BasketForm from './BasketForm/BasketForm';
import MyModal from '../../components/UI/MyModal/MyModal';
import SaveModal from '../../components/UI/SaveModal/SaveModal';
function Basket() {
  const [message, setMessage] = useState('');
  const [bought, setBought] = useState(false);
  const [error, setError] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [modal, setModal] = useState(false);
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

  if (isSave) {
    return (
      <SaveModal setIsSave={setIsSave} error={error}>
        {message}
      </SaveModal>
    );
  }

  if (bought === true) {
    console.log('Купили');
    return (
      <Container>
        {error ? (
          <>
            <div className={s.thanks}>Попробуйте еще раз, пожалуйста</div>
            <div className={s.buttonContainer}>
              <button
                onClick={() => setBought(false)}
                className={s.back}
              >
                Назад
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={s.thanks}>
              Спасибо за заказ, он ожидает вас в пункте выдачи
            </div>
            <div className={s.buttonContainer}>
              <button onClick={() => navigate(SHOP_ROUTE + '/all')} className={s.back}>
                Назад
              </button>
            </div>
          </>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <MyModal visible={modal} setVisible={setModal}>
        <BasketForm
          setVisible={setModal}
          user={user}
          setBought={setBought}
          price={total}
          setError={setError}
          setIsSave={setIsSave}
          setMessage={setMessage}
        />
      </MyModal>
      {products.length !== 0 ? (
        <div>
          <h1 className={s.title}>Корзина товаров</h1>
          {products.map(product => (
            <BasketCard
              key={product.ProductId}
              product={product}
              deleteFromBasket={user.deleteFromBasketById.bind(user)}
              updateBasket={user.updateBasket.bind(user)}
              products={products}
              fetchTotalCost={fetchTotalCost}
              setProducts={setProducts}
            />
          ))}
          <h1 className={s.total}>
            Итого...
            <span className={s.totalPrice}>
              {new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: 'RUB',
              }).format(total)}
            </span>
          </h1>
          <button className={s.buy} onClick={() => setModal(true)}>
            Заказать
          </button>
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
