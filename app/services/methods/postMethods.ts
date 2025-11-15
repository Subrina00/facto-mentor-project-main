import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { handleAxiosError } from '~/utils/errorHandler';

export const createPostMethods = (api: AxiosInstance) => ({
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    try {
      const response = await api.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
});