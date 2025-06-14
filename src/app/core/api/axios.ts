// utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cvms-microservice.afripointdev.com',
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;