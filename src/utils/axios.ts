import axios from 'axios';
import { getToken, clearToken } from './index';

const api = axios.create({
  baseURL: 'https://toko.ox-sys.com',
  headers: {
    Accept: 'application/json',
  },
});

// Request Interceptor: add Authorization header
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Prevent multiple redirects
let isRedirecting = false;

// Response Interceptor: handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isRedirecting) {
      isRedirecting = true;
      clearToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
