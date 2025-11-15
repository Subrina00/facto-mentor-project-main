import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { handleAxiosError } from '~/utils/errorHandler';

export const createDeleteMethods = (api: AxiosInstance) => ({
  async delete<T>(url: string, config?: AxiosRequestConfig<any>) {
    try {
      const response = await api.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
});