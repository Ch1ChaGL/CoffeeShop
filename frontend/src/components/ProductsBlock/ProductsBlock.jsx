import React from 'react';
import s from './ProductsBlock.module.css';
import ProductCard from './ProductCard/ProductCard';
import { useState, useEffect } from 'react';
import ProductService from '../../API/ProductService';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import Spinner from '../UI/Spinner/Spinner';


function ProductsBlock({ searchQuery, sort, setIsSave }) {

  const location = useLocation();
  const category = location.pathname.split('/').slice(-1)[0];
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchProducts()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  async function fetchProducts() {
    const products = await ProductService.getAllProduct();
    setProducts(products);
  }

  const sortedAndFilteredProducts = useProducts(
    products,
    category,
    searchQuery,
  );
  const filteredProducts = useProducts(
    sortedAndFilteredProducts,
    sort,
    searchQuery,
  );
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className={s.gridСontainer}>
      {filteredProducts.map(product => (
        <ProductCard key={product.ProductId} product={product} setIsSave={setIsSave}/>
      ))}
    </div>
  );
}

export default ProductsBlock;
