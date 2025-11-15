export interface ErrorResponse {
    message: string;
    status: number;
  }
  
export interface ApiErrorResponse {
    message: string;
    status: number;
    data?: unknown;
  }