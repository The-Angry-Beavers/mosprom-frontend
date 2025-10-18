import type { TableType, UpdateTableDto } from '@/entity';
import { API_URL } from '@/shared/config/apiUrl';
import { axiosClassic } from '../api';

class TableService {
  async getTables() {
    return await axiosClassic.get<TableType[]>(API_URL.tables(''));
  }
  async createTable() {
    return await axiosClassic.post<unknown>(API_URL.tables(`/create`));
  }
  async deleteTable(id: string) {
    return await axiosClassic.delete<unknown>(API_URL.tables(`/${id}`));
  }
  async updateTable({
    dto,
    tableId,
  }: {
    dto: UpdateTableDto;
    tableId: string;
  }) {
    return await axiosClassic.patch<TableType>(
      API_URL.tables(`/${tableId}`),
      dto
    );
  }
  async getTable(id: string) {
    return await axiosClassic.get<TableType>(API_URL.tables(`/${id}`));
  }
}

export const tableService = new TableService();
