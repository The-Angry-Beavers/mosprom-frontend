import { userService } from '@/shared/api';
import { QUERY_KEY } from '@/shared/config/querykey';
import { useQuery } from '@tanstack/react-query';

export const useGetMe = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_ME],
    queryFn: async () => await userService.getMe(),
    select: (data) => data.data,
    retry: false,
  });

  return query;
};

export const useGetAllUsers = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_USERS],
    queryFn: async () => await userService.getAllUsers(),
  });

  return query;
};
