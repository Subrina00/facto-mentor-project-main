import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { handleAxiosError } from '~/utils/errorHandler';

export const createPutMethods = (api: AxiosInstance) => ({
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    try {
      const response = await api.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
});