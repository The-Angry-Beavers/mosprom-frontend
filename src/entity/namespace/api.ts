import { namespaceService } from '@/shared/api/services/namespace.service';
import { QUERY_KEY } from '@/shared/config/querykey';
import { useQuery } from '@tanstack/react-query';

export const useGetALlNamespace = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_NAMESPACES],
    queryFn: () => namespaceService.getAllNamespaces(),
  });

  const mockData = namespaceService.getAllNamespaces();

  return { mockData, data, isLoading };
};

export const useGetNamespaceById = (id: number) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_NAMESPACE],
    queryFn: () => namespaceService.getNamespaceById(id),
  });

  const mockData = namespaceService.getNamespaceById(id);

  return { mockData, data, isLoading };
};
