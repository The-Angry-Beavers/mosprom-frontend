import { API_URL } from '@/shared/config/apiUrl';
import { axiosClassic } from '../api';
import type { NamespaceType } from '@/entity';

class NamespaceService {
  async getAllNamespaces() {
    return await axiosClassic.get<NamespaceType[]>(API_URL.namespace(''));
  }
}

export const namespaceService = new NamespaceService();
