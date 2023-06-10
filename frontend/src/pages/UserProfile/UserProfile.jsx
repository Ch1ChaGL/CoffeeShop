import React, { useState, useContext, useEffect } from 'react';
import s from './UserProfile.module.css';
import UserSidebar from './UserSidebar/UserSidebar';
import Container from '../../components/Container/Container';
import { useLocation } from 'react-router-dom';
import OrdersHistory from './OrdersHistory/OrdersHistory';
import { Context } from '../..';
import { getUserById, updateUserById } from '../../API/userAPI';
function UserProfile() {
  const location = useLocation();
  const { user } = useContext(Context);
  const page = location.pathname.split('/').slice(-1)[0];
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSave = async () => {
    await updateUserById(user.user.UserId, {
      FirstName: firstName,
      LastName: lastName,
    });
    console.log(user.user);
    console.log('Сохранено:', firstName, lastName);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const response = await getUserById(user.user.UserId);
    setFirstName(response.FirstName);
    setLastName(response.LastName);
  };

  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = e => {
    setLastName(e.target.value);
  };

  let componentToRender;

  switch (page) {
    case 'orders':
      componentToRender = <OrdersHistory />;
      break;
    default:
      componentToRender = null;
  }
  return (
    <Container>
      <div className={s.pageContainer}>
        <div className={s.sidebar}>
          <UserSidebar />
        </div>
        <div className={s.contentBlock}>
          {componentToRender ? (
            componentToRender
          ) : (
            <div className={s.profile}>
              <h2 className={s.heading}>Профиль клиента</h2>
              <div className={s.field}>
                <label className={s.label}>Имя:</label>
                <input
                  type='text'
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className={s.input}
                />
              </div>
              <div className={s.field}>
                <label className={s.label}>Фамилия:</label>
                <input
                  type='text'
                  value={lastName}
                  onChange={handleLastNameChange}
                  className={s.input}
                />
              </div>
              <button onClick={handleSave} className={s.button}>
                Сохранить
              </button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default UserProfile;
