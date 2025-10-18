import type { UserType } from '@/entity';
import { axiosClassic } from '..';
import { API_URL } from '@/shared/config/apiUrl';

class UserService {
  async getMe() {
    return await axiosClassic.get<UserType>(API_URL.user('/me'));
  }
  async getAllUsers() {
    return await axiosClassic.get<UserType[]>(API_URL.user(''));
  }
}

export const userService = new UserService();
