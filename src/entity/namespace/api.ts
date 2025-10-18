import { namespaceService } from '@/shared/api/services/namespace.service';
import { QUERY_KEY } from '@/shared/config/querykey';
import { useQuery } from '@tanstack/react-query';

export const useGetALlNamespace = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_NAMESPACES],
    queryFn: () => namespaceService.getAllNamespaces(),
    select: (data) => data.data,
  });

  return { data, isLoading };
};
