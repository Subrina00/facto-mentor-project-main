import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { handleAxiosError } from '~/utils/errorHandler';

export const createGetMethods = (api: AxiosInstance) => ({
  async get<T>(url: string, config?: AxiosRequestConfig<any>) {
    try {
      const response = await api.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
});