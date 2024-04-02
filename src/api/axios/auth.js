//rutas para la api de usuarios
import { API as axios } from './axios';

import { headersWithFormDataContentType } from './axios'; //cambiar formulario para admitir fotos

export const registerReq = (user) => axios.post('/users/register', user);

export const loginReq = (user) => axios.post('/users/login', user);

export const logoutReq = () => axios.post('/users/logout');

export const getUserLogged = (userId) => axios.get(`/users/user/${userId}`);

export const patchUserReq = (id, userData) => axios.patch(`/users/user/${id}`, userData, { headers: headersWithFormDataContentType });

export const getOneUserReq = (id) => axios.get(`/users/user/${id}`);

export const getAllUsersReq = () => axios.get('/users/allUsers');

export const deleteUserReq = (id) => axios.delete(`/users/user/${id}`);