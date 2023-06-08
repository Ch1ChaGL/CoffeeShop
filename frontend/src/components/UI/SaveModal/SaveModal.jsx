import React, { useState, useEffect } from 'react';
import s from './SaveModal.module.css';

function SaveModal({ setIsSave }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);

    const timer = setTimeout(() => {
      setShowModal(false);
      setTimeout(() => {
        setIsSave(false);
      }, 1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${s.modal} ${showModal ? s.show : s.close}`}>
      <div className={s.modalContent}>
        <span>Успешно сохранено!</span>
      </div>
    </div>
  );
}

export default SaveModal;
