import { API_URL } from '@/shared/config/apiUrl';
import { axiosClassic } from '../../api';
import { saveTokenStorage, removeFromStorage } from './authToken.service';

export interface IUser {
  id: string;
  email: string;
}

export interface IAuthForm {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}

class AuthService {
  async main(type: 'login' | 'register', data: IAuthForm) {
    const response = await axiosClassic<IAuthResponse>({
      url: API_URL.auth(`/${type}`),
      method: 'POST',
      data,
    });

    if (response.data.accessToken) {
      saveTokenStorage(response.data.accessToken);
    }

    return response;
  }

  async getNewTokens() {
    const response = await axiosClassic<IAuthResponse>({
      url: API_URL.auth('login/access-token'),
      method: 'GET',
    });

    if (response.data.accessToken) {
      saveTokenStorage(response.data.accessToken);
    }

    return response;
  }

  async logout() {
    const response = await axiosClassic<boolean>({
      url: API_URL.auth('logout'),
      method: 'POST',
    });

    if (response.data) removeFromStorage();

    return response;
  }
}

export const authService = new AuthService();
