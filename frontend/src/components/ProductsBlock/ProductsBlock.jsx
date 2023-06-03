import React from 'react';
import s from './ProductsBlock.module.css';
import { product } from '../../utils/product';
import ProductCard from './ProductCard/ProductCard';
function ProductsBlock() {
  console.log(product);
  return (
    <div className={s.gridСontainer}>
      {product.map(product => (
        <ProductCard key={product.ProductId} product={product} text={'12345'} />
      ))}
    </div>
  );
}

export default ProductsBlock;
