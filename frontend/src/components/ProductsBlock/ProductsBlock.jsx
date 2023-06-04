import React from 'react';
import s from './ProductsBlock.module.css';
import ProductCard from './ProductCard/ProductCard';
import { useState, useEffect } from 'react';
import ProductService from '../../API/ProductService';
function ProductsBlock({ category }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const products = await ProductService.getAllProduct();
    setProducts(products);
  }
  return !category ? (
    <div className={s.gridСontainer}>
      {products.map(product => (
        <ProductCard key={product.ProductId} product={product} />
      ))}
    </div>
  ) : (
    <div className={s.gridСontainer}>
      {products
        .filter(product => product.CategoryId === category)
        .map(product => (
          <ProductCard key={product.ProductId} product={product} />
        ))}
    </div>
  );
}

export default ProductsBlock;
