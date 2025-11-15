import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { setupInterceptors } from './interceptors';
import { createHttpMethods } from './methods';

class HttpService {
  private api: AxiosInstance;
  public get: ReturnType<typeof createHttpMethods>['get'];
  public post: ReturnType<typeof createHttpMethods>['post'];
  public put: ReturnType<typeof createHttpMethods>['put'];
  public delete: ReturnType<typeof createHttpMethods>['delete'];

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    // Setup interceptors
    setupInterceptors(this.api);

    // Bind HTTP methods
    const httpMethods = createHttpMethods(this.api);
    this.get = httpMethods.get;
    this.post = httpMethods.post;
    this.put = httpMethods.put;
    this.delete = httpMethods.delete;
  }
}

export const httpService = new HttpService();