import React from 'react';
import s from './ProductsBlock.module.css';
import ProductCard from './ProductCard/ProductCard';
import { useState, useEffect } from 'react';
import ProductService from '../../API/ProductService';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';


function ProductsBlock({ searchQuery }) {
  const location = useLocation();
  const category = location.pathname.split('/').slice(-1)[0];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    console.log('Работает только при монтировании');
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

  return (
    <div className={s.gridСontainer}>
      {sortedAndFilteredProducts.map(product => (
        <ProductCard key={product.ProductId} product={product} />
      ))}
    </div>
  );
}

export default ProductsBlock;
