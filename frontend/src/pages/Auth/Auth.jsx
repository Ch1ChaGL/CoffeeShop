import React, { useState, useContext } from 'react';
import s from './Auth.module.css';
import { Link } from 'react-router-dom';
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import { useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../../API/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { SHOP_ROUTE } from '../../utils/consts';
import SaveModal from '../../components/UI/SaveModal/SaveModal';
const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [message, setMessage] = useState('');
  const click = async () => {
    try {
      setIsSave(true);
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      setError(false);
      navigate(SHOP_ROUTE + '/all');
    } catch (err) {
      setError(true);
      setMessage(err.response.data.message);
    }
  };

  return (
    <div className={s.container}>
      {isSave && message.length !== 0 ? (
        <SaveModal setIsSave={setIsSave} error={error} setMessage={setMessage}>
          {message}
        </SaveModal>
      ) : null}
      <div className={s['login-form']}>
        <h2 className={s['login-heading']}>
          {isLogin ? 'Авторизация' : 'Регистрация'}
        </h2>
        <div className={s['form-group']}>
          <label for='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={event => setEmail(event.target.value)}
            className={s['form-input']}
          />
        </div>
        <div className={s['form-group']}>
          <label for='password'>Пароль:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={event => setPassword(event.target.value)}
            className={s['form-input']}
          />
        </div>
        <div className={s['register-text']}>
          {isLogin ? (
            <div>
              Нет аккаунта?
              <Link to={REGISTRATION_ROUTE} className={s['register-link']}>
                Зарегистрироваться
              </Link>
            </div>
          ) : (
            <div>
              Уже есть аккаунта?
              <Link to={LOGIN_ROUTE} className={s['register-link']}>
                Войти
              </Link>
            </div>
          )}
        </div>
        <button className={s['login-button']} onClick={click}>
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </div>
    </div>
  );
});

export default Auth;
