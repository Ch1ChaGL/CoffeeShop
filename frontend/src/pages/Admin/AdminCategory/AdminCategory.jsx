import React, { useState, useEffect } from 'react';
import s from './AdminCategory.module.css';
import CategoryCard from './CategoryCard/CategoryCard';
import CategoryService from '../../../API/CategoryService';
function AdminCategory() {
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    const resp = await CategoryService.getAllCategory();
    setCategorys(resp);
  };

  return (
    <div>
      <button className={s.add}>Добавить</button>
      {categorys.map(category => (
        <CategoryCard category={category} key={category.ProductId} />
      ))}
    </div>
  );
}

export default AdminCategory;
