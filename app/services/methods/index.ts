import type { AxiosInstance } from 'axios';
import { createGetMethods } from './getMethods';
import { createPostMethods } from './postMethods';
import { createPutMethods } from './putMethods';
import { createDeleteMethods } from './deleteMethods';

export const createHttpMethods = (api: AxiosInstance) => ({
  ...createGetMethods(api),
  ...createPostMethods(api),
  ...createPutMethods(api),
  ...createDeleteMethods(api),
});