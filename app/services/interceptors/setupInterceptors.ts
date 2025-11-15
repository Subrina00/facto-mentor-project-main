import type { AxiosInstance } from 'axios';
import { requestInterceptor } from './requestInterceptor';
import { responseInterceptor } from './responseInterceptor';

export const setupInterceptors = (axiosInstance: AxiosInstance): void => {
  // Setup request interceptor
  axiosInstance.interceptors.request.use(
    requestInterceptor.onFulfilled,
    requestInterceptor.onRejected
  );

  // Setup response interceptor
  axiosInstance.interceptors.response.use(
    responseInterceptor.onFulfilled,
    responseInterceptor.onRejected
  );
};