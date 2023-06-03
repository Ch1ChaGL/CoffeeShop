import React from 'react';
import Container from '../../components/Container/Container';
import s from './Shop.module.css';
import MyInput from '../../components/UI/MyInput/MyInput';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProductsBlock from '../../components/ProductsBlock/ProductsBlock';
function Shop() {
  return (
    <Container>
      <div className={s.pageContainer}>
        <div className={s.topBar}>
          <MyInput />
        </div>
        <div className={s.sidebar}>
          <Sidebar />
        </div>
        <div className={s.productsBlock}>
          <ProductsBlock />
        </div>
      </div>
    </Container>
  );
}

export default Shop;
