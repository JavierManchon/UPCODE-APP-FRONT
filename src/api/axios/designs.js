import { API as axios } from './axios';

export const getDesigns = () => axios.get('/designs/allDesigns');
export const removeDesignReq = (id) => axios.delete(`/designs/removeDesign/${id}`);
export const getDesignById = (designId) => axios.get(`/designs/oneDesign/${designId}`);

