import axios, { type CreateAxiosDefaults } from 'axios';
import {
  getAccessToken,
  removeFromStorage,
} from './services/auth/authToken.service';
import { authService } from './services/auth/auth.service';
import { errorCatch, getContentType } from './api.helpers';
import { API_URL } from '../config/apiUrl';

const options: CreateAxiosDefaults = {
  baseURL: 'http://localhost:5000/api',
  headers: getContentType(),
  withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosWithAuth.interceptors.request.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await authService.getNewTokens();

        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') {
          removeFromStorage();

           window.location.href = API_URL.auth('/login');
        }
      }

      throw error;
    }
  }
);

export { axiosClassic, axiosWithAuth };
