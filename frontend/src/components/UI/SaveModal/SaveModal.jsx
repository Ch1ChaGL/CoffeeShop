import React, { useState, useEffect } from 'react';
import s from './SaveModal.module.css';

function SaveModal({ setIsSave, children, error, setMessage }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);

    const timer = setTimeout(() => {
      setShowModal(false);
      setTimeout(() => {
        setIsSave(false);
        if (setMessage) {
          setMessage('');
        }
      }, 1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={`${s.modal} ${showModal ? s.show : s.close}`}>
      <div className={`${s.modalContent} ${error === true ? s.err : ''}`}>
        <span>{children}</span>
      </div>
    </div>
  );
}

export default SaveModal;
