import { tableService } from '@/shared/api';
import { QUERY_KEY } from '@/shared/config/querykey';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CreateTableDto } from './type';
import type {
  AddRowData,
  DeleteRowData,
  UpdateRowData,
} from '@/entity/table/type';

export const useGetAllTables = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_NAMESPACE],
    queryFn: async () => await tableService.getTables(),
    select: (data) => data.data,
  });

  return query;
};

export const useGetTable = (id: string) => {
  const query = useQuery({
    queryKey: [`${QUERY_KEY.GET_TABLE}_${id}`],
    queryFn: async () => await tableService.getTable(id),
  });

  return query;
};

export const useGetTableRows = (id: string) => {
  const query = useQuery({
    queryKey: [`${QUERY_KEY.GET_TABLE_ROWS}_${id}`],
    queryFn: async () => await tableService.getTableRows(id),
  });

  return query;
};

export const useAddTableRow = (id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: [QUERY_KEY.ADD_TABLE_ROW],
    mutationFn: async (data: AddRowData) =>
      await tableService.addTableRow(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${QUERY_KEY.GET_TABLE_ROWS}_${id}`],
      });
    },
  });

  return mutation;
};

export const useDeleteTableRow = (id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: [QUERY_KEY.DELETE_TABLE_ROW],
    mutationFn: async (data: DeleteRowData) =>
      await tableService.deleteTableRow(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${QUERY_KEY.GET_TABLE_ROWS}_${id}`],
      });
    },
  });

  return mutation;
};

export const useUpdateTableRow = (id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: [QUERY_KEY.UPDATE_TABLE_ROW],
    mutationFn: async (data: UpdateRowData) =>
      await tableService.updateTableRow(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${QUERY_KEY.GET_TABLE_ROWS}_${id}`],
      });
    },
  });

  return mutation;
};

export const useCreateTable = (callback?: (table_id: number) => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY.CREATE_TABLE],
    mutationFn: async (dto: CreateTableDto) =>
      await tableService.createTable(dto),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_TABLES],
      });
      
      typeof callback === 'function' && callback?.(data.data.id || 0);
    },
  });

  return mutation;
};

export const useDeleteTable = (callback?: () => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY.DELETE_TABLE],
    mutationFn: async (id: string) => await tableService.deleteTable(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_TABLES],
      });

      typeof callback === 'function' && callback?.();
    },
  });

  return mutation;
};
