import { namespaceService } from '@/shared/api/services/namespace.service';
import { QUERY_KEY } from '@/shared/config/querykey';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CreateTableDto, NamespaceMoveDto } from './type';

export const useGetALlNamespace = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_NAMESPACES],
    queryFn: async () => await namespaceService.getAllNamespaces(),
    select: (data) => data.data,
  });

  return query;
};

export const useGetNamespace = (id: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_NAMESPACES],
    queryFn: async () => await namespaceService.getNamespaceById(id),
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

export const useMovetoTable = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY.MOVE_NAMESPACE_TABLE],
    mutationFn: async (dto: NamespaceMoveDto) =>
      await namespaceService.moveTabletoNamespace(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_NAMESPACES],
      });
    },
  });

  return mutation;
};
