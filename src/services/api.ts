import axios from 'axios';
import { API_URL } from '../config/constants';

const api = axios.create({
  baseURL: API_URL,
});

export const merchantsApi = {
  getAll: () => api.get('/merchants'),
  getAllWithDetails: () => api.get('/merchants/details'),
  getById: (id: number) => api.get(`/merchants/${id}`),
  getByIdWithDetails: (id: number) => api.get(`/merchants/${id}/details`),
  create: (data: FormData) => api.post('/merchants', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  update: (id: number, data: FormData) => api.put(`/merchants/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  delete: (id: number) => api.delete(`/merchants/${id}`),
  toggleCashback: (id: number, enabled: boolean) => api.put(`/merchants/${id}/cashback`, { enabled }),
};

export const offersApi = {
  getAll: () => api.get('/offers'),
  getById: (id: number) => api.get(`/offers/${id}`),
  create: (data: any) => api.post('/offers', data),
  update: (id: number, data: any) => api.put(`/offers/${id}`, data),
  delete: (id: number) => api.delete(`/offers/${id}`),
};

export default api;
