import { useMemo } from 'react';

export const useSortedProducts = (products, sort) => {
  const sortedProducts = useMemo(() => {
    if (sort === 'all') {
      return products;
    } else if (sort === 'Name') {
      console.log('Сортировка по имени');
      return products.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sort === 'PriceUp') {
      console.log('Сортировка по прайсу');
      return products.sort((a, b) => b.Price - a.Price);
    } else if (sort === 'PriceDown') {
      console.log('Сортировка по прайсу');
      return products.sort((a, b) => a.Price - b.Price);
    } else {
      const idCategory = parseInt(sort);
      return products.filter(product => product.CategoryId === idCategory);
    }
  }, [sort, products]);

  return sortedProducts;
};

export const useProducts = (products, sort, query) => {
  const sortedProducts = useSortedProducts(products, sort);
  console.log('Сортировнный в хуке ');
  console.log(sortedProducts);
  const sortedAndFiltered = useMemo(() => {
    return sortedProducts.filter(product =>
      product.Name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, sortedProducts, sort]);

  return sortedAndFiltered;
};
