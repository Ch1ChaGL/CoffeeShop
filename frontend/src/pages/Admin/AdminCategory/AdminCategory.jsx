import React, { useState, useEffect } from 'react';
import s from './AdminCategory.module.css';
import CategoryCard from './CategoryCard/CategoryCard';
import CategoryService from '../../../API/CategoryService';
import MyModal from '../../../components/UI/MyModal/MyModal';
import CategoryForm from '../../../components/CategoryForm/CategoryForm';
function AdminCategory() {
  const [categorys, setCategorys] = useState([]);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    const resp = await CategoryService.getAllCategory();
    setCategorys(resp);
  };

  return (
    <div>
      <MyModal visible={modal} setVisible={setModal}>
        <CategoryForm setVisible={setModal} fetchCategory={fetchCategory} />
      </MyModal>
      <button className={s.add} onClick={() => setModal(true)}>
        Добавить
      </button>
      {categorys.map(category => (
        <CategoryCard
          category={category}
          categorys={categorys}
          setCategorys={setCategorys}
          key={category.CategoryId}
        />
      ))}
    </div>
  );
}

export default AdminCategory;
