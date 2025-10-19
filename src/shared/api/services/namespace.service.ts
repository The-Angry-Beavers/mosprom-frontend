import { API_URL } from '@/shared/config/apiUrl';
import { axiosWithAuth } from '../api';
import type { NamespaceType } from '@/entity';
import type { CreateTableDto, NamespaceMoveDto } from '@/entity/namespace';

//TODO сделать async
class NamespaceService {
  async getNamespaceById(id: string) {
    return await axiosWithAuth.get<NamespaceType>(API_URL.namespace(`/${id}`));
  }

  async getAllNamespaces() {
    return await axiosWithAuth.get<NamespaceType[]>(API_URL.namespace());
  }

  async moveTabletoNamespace(dto:NamespaceMoveDto) {
    return await axiosWithAuth.post<unknown>(API_URL.namespace('/moveTable'), dto);
  }

  async createNamespace(dto: CreateTableDto) {
    return await axiosWithAuth.post<NamespaceType>(API_URL.namespace(), dto);
  }
}

export const namespaceService = new NamespaceService();
