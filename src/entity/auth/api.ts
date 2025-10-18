import { authService } from '@/shared/api';

import { QUERY_KEY } from '@/shared/config/querykey';
import { useMutation } from '@tanstack/react-query';
import type { IAuthLoginDto, IAuthRegisterDto } from './type';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';

export const useLogin = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: [QUERY_KEY.LOGIN],
    mutationFn: async (dto: IAuthLoginDto) => await authService.login(dto),
    onSuccess: () => {
      navigate(ROUTES.HOME);
    },
  });

  return mutation;
};

export const useRegister = (callback?: () => void) => {
  const mutation = useMutation({
    mutationKey: [QUERY_KEY.REGISTER],
    mutationFn: async (dto: IAuthRegisterDto) =>
      await authService.register(dto),
    onSuccess: () => {
      typeof callback === 'function' && callback?.();
    },
  });

  return mutation;
};
