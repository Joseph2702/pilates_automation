import { envConfig } from './env.config';

export const apiConfig = {
  baseURL: envConfig.API_BASE_URL,
  timeout: envConfig.TIMEOUT,
};

export default apiConfig;
