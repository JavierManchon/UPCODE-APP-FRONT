import { API as axios } from './axios';

export const getDesigns = () => axios.get('/designs/allDesigns');

export const getDesignById = () => axios.get('/desgins/oneDesign/:designId');