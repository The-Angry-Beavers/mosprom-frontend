import { API_URL } from '@/shared/config/apiUrl';
import { axiosClassic } from '../api';
import type { NamespaceType } from '@/entity';

const mock: NamespaceType[] = [
  {
    id: 1,
    name: 'Пространство 1',
    description: 'Описание 1',
    tables: [],
  },
  {
    id: 2,
    name: 'Пространство 2',
    description: 'Описание 2',
    tables: [],
  },
];

//TODO сделать async
class NamespaceService {
  async getNamespaceById(id: number) {
    return await axiosClassic.get<NamespaceType>(API_URL.namespace(`/${id}`));
  }

  async getAllNamespaces() {
    return await axiosClassic.get<NamespaceType>(API_URL.namespace());
  }

  getMockNamespaceById() {
    return mock[0];
  }

  getMockAllNamespaces() {
    return mock;
  }
}

export const namespaceService = new NamespaceService();
