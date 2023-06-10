import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const registration = async (email, password) => {
  const response = await $host.post('api/user/registration', {
    Email: email,
    Password: password,
    RoleId: 2,
  });
  localStorage.setItem('jwtToken', response.data.jwtToken);
  return jwt_decode(response.data.jwtToken);
};

export const login = async (email, password) => {
  const response = await $host.post('api/user/login', {
    Email: email,
    Password: password,
  });
  localStorage.setItem('jwtToken', response.data.jwtToken);
  return jwt_decode(response.data.jwtToken);
};
export const check = async () => {
  const response = await $authHost.get('api/user/auth');
  localStorage.setItem('jwtToken', response.data.token);
  console.log(response);
  console.log(response.data.token);
  return jwt_decode(response.data.token);
};

export const logout = () => {
  localStorage.removeItem('jwtToken');
};

export const getUserById = async (id, user) => {
  console.log(user);
  const response = await $authHost.get(`api/user/${id}`, user);
  return response.data;
};
export const updateUserById = async (id, user) => {
  console.log(user);
  const response = await $authHost.put(`api/user/${id}`, user);
  return response.data;
};
