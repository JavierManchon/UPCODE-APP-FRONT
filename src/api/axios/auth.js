import { API as axios } from './axios';

export const registerReq = (user) => axios.post('/users/register', user);

export const loginReq = (user) => axios.post('/users/login', user);

export const logoutReq = () => axios.post('/users/logout');