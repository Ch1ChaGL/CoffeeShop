import { $authHost, $host } from './index';

export const registration = async (email, password) => {
  const response = await $host.post('api/user/registration', {
    Email: email,
    Password: password,
    RoleId: 1,
  });
  return response;
};

export const login = async (email, password) => {
  const response = await $host.post('api/user/login', {
    Email: email,
    Password: password,
  });
  return response;
};
export const check = async () => {
  const response = await $host.post('api/auth/registration');
  return response;
};
