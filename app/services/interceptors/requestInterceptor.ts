import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const requestInterceptor = {
  onFulfilled: (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  
  onRejected: (error: AxiosError) => {
    return Promise.reject(error);
  },
};