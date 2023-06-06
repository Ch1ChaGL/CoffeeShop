import React from 'react';
import s from './AdminProducts.module.css';
import { useEffect, useState } from 'react';
import MyInput from '../../../components/UI/MyInput/MyInput';
import { useProducts } from '../../../hooks/useProducts';
import ProductService from '../../../API/ProductService';
import AdminProductCard from './AdminProductCard/AdminProductCard';
import MyModal from '../../../components/UI/MyModal/MyModal';
import ProductForm from '../../../components/ProductForm/ProductForm';
function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const products = await ProductService.getAllProduct();
    setProducts(products);
  }

  const sortedAndFilteredProducts = useProducts(products, 'all', searchQuery);

  return (
    <div className={s.container}>
      <div className={s.topBar}>
        <MyInput
          placeholder='Поиск...'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <MyModal visible={modal} setVisible={setModal}>
        <ProductForm />
      </MyModal>
      <button className={s.add} onClick={() => setModal(true)}>
        Добавить
      </button>
      <div className={s.products}>
        {sortedAndFilteredProducts.map(product => (
          <AdminProductCard product={product} />
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
