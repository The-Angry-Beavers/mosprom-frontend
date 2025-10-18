import { namespaceService } from '@/shared/api/services/namespace.service';
import { QUERY_KEY } from '@/shared/config/querykey';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CreateTableDto } from './type';

export const useGetALlNamespace = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_NAMESPACES],
    queryFn: () => namespaceService.getAllNamespaces(),
    select: (data) => data.data,
  });

  return query;
};

export const useCreateNamespace = (callback?: () => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY.GET_ALL_NAMESPACES],
    mutationFn: async (dto: CreateTableDto) =>
      await namespaceService.createNamespace(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_NAMESPACES],
      });
      typeof callback === 'function' && callback?.();
    },
  });

  return mutation;
};
