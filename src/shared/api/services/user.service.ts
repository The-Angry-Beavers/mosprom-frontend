import type { IUser } from '@/entity';
import { axiosWithAuth } from '..';
import { API_URL } from '@/shared/config/apiUrl';

class UserService {
  async getMe() {
    return await axiosWithAuth.get<IUser>(API_URL.user('/me'));
  }
  async getAllUsers() {
    return await axiosWithAuth.get<IUser[]>(API_URL.user(''));
  }
}

export const userService = new UserService();
