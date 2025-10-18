import { tableService } from '@/shared/api';
import { QUERY_KEY } from '@/shared/config/querykey';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetAllTables = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_TABLES],
    queryFn: async () => await tableService.getTables(),
  });

  return query;
};

export const useGetTable = (id: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_TABLE],
    queryFn: async () => await tableService.getTable(id),
  });

  return query;
};

export const useCreateTable = () => {
  const mutation = useMutation({
    mutationKey: [QUERY_KEY.CREATE_TABLE],
    mutationFn: async () => await tableService.createTable(),
  });

  return mutation;
};

export const useDeleteTable = (id: string) => {
  const mutation = useQuery({
    queryKey: [QUERY_KEY.DELETE_TABLE],
    queryFn: async () => await tableService.deleteTable(id),
  });

  return mutation;
};
