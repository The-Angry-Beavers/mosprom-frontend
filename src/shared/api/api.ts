import axios, { type CreateAxiosDefaults } from 'axios';
import {
  getAccessToken,
  removeFromStorage,
} from './services/auth/authToken.service';

import { errorCatch, getContentType } from './api.helpers';


const options: CreateAxiosDefaults = {
  baseURL: 'https://d5df28gmfmto92a1iqoc.bixf7e87.apigw.yandexcloud.net/api',
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
    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      removeFromStorage();

      window.location.href = '/auth';
    }
  }
);

export { axiosClassic, axiosWithAuth };
