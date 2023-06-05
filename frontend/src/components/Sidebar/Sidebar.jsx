import React from 'react';
import { Link } from 'react-router-dom';
import s from './Sidebar.module.css';
import { useState, useEffect } from 'react';
import CategoryService from '../../API/CategoryService';
function Sidebar() {
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
      {/* {categorys.map(category => (
        <Link
          key={category.CategoryId}
          data-category-id={category.CategoryId}
          className={s.link}
          onClick={event =>
            setCategory(parseInt(event.target.dataset.categoryId))
          }
          to={`/shop/${category.CategoryId}`}
        >
          {category.Name}
        </Link>
      ))} */}
      {/* <Link className={s.link} onClick={() => setCategory(0)} to={`/shop/all`}>
        Все
      </Link> */}
    </div>
  );
}

export default Sidebar;
