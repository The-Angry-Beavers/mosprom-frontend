import { tableService } from '@/shared/api';
import { QUERY_KEY } from '@/shared/config/querykey';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAllTables = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_TABLES],
    queryFn: async () => await tableService.getTables(),
    select: (data) => data.data,
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

export const useDeleteTable = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY.DELETE_TABLE],
    mutationFn: async (id: string) => await tableService.deleteTable(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_TABLES],
      });
    },
  });

  return mutation;
};
