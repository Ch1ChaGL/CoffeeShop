import React from 'react';
import s from './CategoryCard.module.css';
import CategoryService from '../../../../API/CategoryService';
function CategoryCard({ category, categorys, setCategorys }) {
  const deleteCategory1 = async () => {
    await CategoryService.deleteCategory(category.CategoryId);
    setCategorys(categorys.filter(c => c.CategoryId !== category.CategoryId));
  };
  return (
    <div className={s.card}>
      <div className={s.content}>
        <div>
          <h3 className={s.name}>{category.Name}</h3>
          <p className={s.description}>{category.Description}</p>
        </div>
        <div className={s.buttons}>
          <div>
            <button className={s.buttonDelete} onClick={deleteCategory1}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
