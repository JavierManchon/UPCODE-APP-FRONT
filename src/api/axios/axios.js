import axios from "axios";

export const APIHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '',// acepta todo
    // 'Authorization': {
    //     toString() {
    //         return `Bearer ${localStorage.getItem('token')}`;
    //     }
    // },
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
};

export const API = axios.create({
    headers: APIHeader,
    timeout: 10000,
    baseURL: 'http://localhost:8084/api',
});

/*const headersWithFormDataContentType = {
    ...APIHeader,
    "Content-Type": "multipart/form-data"
  };*/