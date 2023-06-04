import React from 'react';
import Container from '../../components/Container/Container';
import s from './Shop.module.css';
import MyInput from '../../components/UI/MyInput/MyInput';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProductsBlock from '../../components/ProductsBlock/ProductsBlock';

function Shop() {
  const [category, setCategory] = React.useState(0);
  return (
    <Container>
      <div className={s.pageContainer}>
        <div className={s.topBar}>
          <MyInput />
        </div>
        <div className={s.sidebar}>
          <Sidebar setCategory={setCategory} />
        </div>
        <div className={s.productsBlock}>
          <ProductsBlock category={category}/>
        </div>
      </div>
    </Container>
  );
}

export default Shop;
