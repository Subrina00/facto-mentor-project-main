import type { AxiosError, AxiosResponse } from 'axios';
import type { ApiErrorResponse } from '~/types/httpService';
import { createErrorResponse } from '~/utils/errorHandler';

export const responseInterceptor = {
  onFulfilled: (response: AxiosResponse) => {
    return response;
  },
  
  onRejected: (error: AxiosError<ApiErrorResponse>) => {
    const errorResponse = createErrorResponse(error);
    return Promise.reject(errorResponse);
  },
};