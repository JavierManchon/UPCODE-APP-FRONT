//rutas para la api de diseños
import { API as axios } from './axios';

export const getDesigns = () => axios.get('/designs/allDesigns');
export const removeDesignReq = (id) => axios.delete(`/designs/removeDesign/${id}`);
export const getDesignById = (designId) => axios.get(`/designs/oneDesign/${designId}`);
export const createDesign = (userId, designData) => axios.post(`/designs/createDesign/${userId}`, designData);
export const patchDesignReq = (designId, designData) => axios.patch(`/designs/editDesign/${designId}`, designData);
export const likesSystemReq = (designId, userId) => axios.patch(`/designs/likes/${designId}/${userId}`)


