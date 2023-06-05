import React from 'react';
import s from './MyInput.module.css';

function MyInput({ searchQuery, setSearchQuery }) {
  return (
    <div className={s.search}>
      <input
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
        className={s.input}
      />
      <img src='/img/loupe.png' className={s.searchIcon} />
    </div>
  );
}

export default MyInput;
