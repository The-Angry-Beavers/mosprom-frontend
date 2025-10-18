import { API_URL } from '@/shared/config/apiUrl';
import { axiosClassic } from '../../api';
import { saveTokenStorage, removeFromStorage } from './authToken.service';
import type {
  IAuthLoginDto,
  IAuthRegisterDto,
  IAuthResponse,
} from '@/entity/auth';

class AuthService {
  async register(data: IAuthRegisterDto) {
    const response = await axiosClassic<IAuthResponse>({
      url: API_URL.register(),
      method: 'POST',
      data: {
        ...data,
        is_active: true,
        is_superuser: false,
        is_verified: false,
      },
    });

    if (response.data.access_token) {
      saveTokenStorage(response.data.access_token);
    }

    return response;
  }

  async login(data: IAuthLoginDto) {
    const response = await axiosClassic<IAuthResponse>({
      url: API_URL.login(),
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.data.access_token) {
      saveTokenStorage(response.data.access_token);
    }

    return response;
  }

  logout() {
    removeFromStorage();
  }
}

export const authService = new AuthService();
