import type { TableType, UpdateTableDto } from '@/entity';
import { API_URL } from '@/shared/config/apiUrl';
import { axiosClassic } from '../api';
import type { CreateTableDto } from '@/entity/table';
import type { AddRowData, DeleteRowData, RowType, UpdateRowData } from "@/entity/table/type";

class TableService {
  async getTables() {
    return await axiosClassic.get<TableType[]>(API_URL.tables(""));
  }
  async createTable(dto: CreateTableDto) {
    return await axiosClassic.post<unknown>(API_URL.tables(''), dto);
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
  async getTableRows(id: string) {
    return await axiosClassic.post<RowType>(API_URL.tables(`/fetchRows`), {
      table_id: id,
      limit: 100,
      offset: 0,
    });
  }

  async addTableRow(data: AddRowData) {
	return await axiosClassic.post<RowType>(API_URL.tables(`/insertRows`), data);
  }

  async deleteTableRow(data: DeleteRowData) {
	return await axiosClassic.post<RowType>(API_URL.tables(`/deleteRows`), data);
  }

  async updateTableRow(data: UpdateRowData) {
	return await axiosClassic.post<RowType>(API_URL.tables(`/updateRows`), data);
  }	
}

export const tableService = new TableService();
