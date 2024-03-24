import axios from "axios";
console.log(sessionStorage.getItem('token'))
export const APIHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '',// acepta todo
    // 'Authorization': {
    //     toString() {
    //         return `Bearer ${localStorage.getItem('token')}`;
    //     }
    // },
};

export const API = axios.create({
    headers: APIHeader,
    baseURL: 'http://localhost:8084/api',
});
API.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
export const headersWithFormDataContentType = {
   ...APIHeader,
   "Content-Type": "multipart/form-data",
 };

