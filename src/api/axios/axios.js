import axios from "axios";

export const APIHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': ''
};

export const API = axios.create({
    headers: APIHeader,
    baseURL: 'https://back-proyecto-final-a8x6.onrender.com/api',
});
//actualizar el authorization con cada login cogiendo el token que da como respuesta el servidor
API.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');

//funcion para cambiar los headers al hacer la llamada a la API con un form que admita fotos
export const headersWithFormDataContentType = {
   ...APIHeader,
   "Content-Type": "multipart/form-data",
 };


