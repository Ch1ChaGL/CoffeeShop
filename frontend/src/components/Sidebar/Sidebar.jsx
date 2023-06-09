import React from 'react';
import { Link } from 'react-router-dom';
import s from './Sidebar.module.css';
import { useState, useEffect } from 'react';
import CategoryService from '../../API/CategoryService';
function Sidebar({ setSort }) {
  const [categorys, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    const category = await CategoryService.getAllCategory();
    setCategories(category);
  }
  console.log(categorys);
  return (
    <div className={s.container}>
      {categorys.map(category => (
        <Link
          key={category.CategoryId}
          data-category-id={category.CategoryId}
          className={s.link}
          to={`/shop/${category.CategoryId}`}
        >
          {category.Name}
        </Link>
      ))}
      <Link className={s.link} to={`/shop/all`}>
        Все
      </Link>
      <button className={s.sortBy} onClick={() => setSort('Name')}>
        По имени
      </button>
      <button className={s.sortBy} onClick={() => setSort('PriceDown')}>
        Сначала дешевые
      </button>
      <button className={s.sortBy} onClick={() => setSort('PriceUp')}>
        Сначала дорогие
      </button>
    </div>
  );
}

export default Sidebar;
