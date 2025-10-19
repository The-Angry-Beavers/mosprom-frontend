import { API_URL } from '@/shared/config/apiUrl';
import { axiosWithAuth } from '..';

class SessionService {
  async getSession(tableId: string) {
    return await axiosWithAuth.get(API_URL.session(`?table_id=${tableId}&is_closed=true`), );
  }

  async getSessionMe() {
    return await axiosWithAuth.get(API_URL.session('/me'));
  }

  async closeSession(id: string) {
    return await axiosWithAuth.get(API_URL.session(`/${id}/close`));
  }

  async connectSession(tableId: string) {
    return await axiosWithAuth.post(API_URL.session(''), { table_id: tableId });
  }
}

export const sessionService = new SessionService();
