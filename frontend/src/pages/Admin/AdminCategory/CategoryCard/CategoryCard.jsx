import React from 'react';
import s from './CategoryCard.module.css';
function CategoryCard({ category }) {
  console.log('Category card');
  console.log(category);
  return (
    <div className={s.card}>
      <div className={s.content}>
        <div>
          <h3 className={s.name}>{category.Name}</h3>
          <p className={s.description}>{category.Description}</p>
        </div>
        <div className={s.buttons}>
          <div>
            <button className={s.buttonDelete}>Удалить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
