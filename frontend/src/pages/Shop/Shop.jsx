import React from 'react';
import Container from '../../components/Container/Container';
import s from './Shop.module.css';
import { useState } from 'react';
import MyInput from '../../components/UI/MyInput/MyInput';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProductsBlock from '../../components/ProductsBlock/ProductsBlock';

function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('all');
  return (
    <Container>
      <div className={s.pageContainer}>
        <div className={s.topBar}>
          <MyInput
            placeholder='Поиск...'
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className={s.sidebar}>
          <Sidebar setSort={setSort} />
        </div>
        <div className={s.productsBlock}>
          <ProductsBlock searchQuery={searchQuery} sort={sort} />
        </div>
      </div>
    </Container>
  );
}

export default Shop;
