import React, { useState } from 'react';
import s from './Auth.module.css';
import { Link } from 'react-router-dom';
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import { useLocation } from 'react-router-dom';
import { login, registration } from '../../API/userAPI';
function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(isLogin);
  const click = async () => {
    if (isLogin) {
      const response = await login(email, password);
    } else {
      const response = await registration(email, password);
      console.log(response);
    }
  };

  return (
    <div className={s.container}>
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
}

export default Auth;
