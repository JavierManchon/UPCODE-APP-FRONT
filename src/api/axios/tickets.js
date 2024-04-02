//rutas para la api de tickets
import { API as axios } from './axios';
import { headersWithFormDataContentType } from './axios';

export const getTicketsReq = () => axios.get('tickets/getAllTickets');
export const removeTicketReq = (id) => axios.delete(`tickets/deleteOneTicket/${id}`);
export const getOneTicketReq = (id) => axios.get(`tickets/getOneTicket/${id}`);
export const postTicketReq = (ticketData) => axios.post(`tickets/postOneTicket`, ticketData, { headers: headersWithFormDataContentType });
export const patchTicketReq = (id,newStatus) => axios.patch(`tickets/editOneTicket/${id}`,newStatus);
export const getTicketsByUserReq = (id) => axios.get(`tickets/getTicketsByUser/${id}`);