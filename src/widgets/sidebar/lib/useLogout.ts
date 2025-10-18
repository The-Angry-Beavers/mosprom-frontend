import { authService } from '@/shared/api';
import { QUERY_KEY } from '@/shared/config/querykey';
import { useMutation } from '@tanstack/react-query';

export const useLogout = () => {
  const { mutate: logout } = useMutation({
    mutationKey: [QUERY_KEY.LOGOUT],
    mutationFn: async () => await authService.logout(),
    onError: (err) => {
      console.warn(err);
    },
  });

  return { logout };
};
