import { useMemo } from 'react';

export const useSortedProducts = (products, sort) => {
  const sortedProducts = useMemo(() => {
    if (sort === 'all') {
      return products;
    } else {
      const idCategory = parseInt(sort);
      return products.filter(product => product.CategoryId === idCategory);
    }
  }, [sort, products]);

  return sortedProducts;
};

export const useProducts = (products, sort, query) => {
  const sortedProducts = useSortedProducts(products, sort);
  console.log(sortedProducts);
  const sortedAndFiltered = useMemo(() => {
    return sortedProducts.filter(product =>
      product.Name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, sortedProducts]);

  return sortedAndFiltered;
};
