import { useGetMe } from '@/entity';
import { useAuth } from '@/entity/user/store';
import type { AxiosError } from 'axios';
import { useEffect } from 'react';

import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { removeUser, setUser } = useAuth();

  const { data, isLoading, error, isError } = useGetMe();

  useEffect(() => {
    if (data && !isLoading) {
      setUser(data);
    }
    if (isError) {
      removeUser();
    }
  }, [data, isError, isLoading]);

  if (isLoading) return null;

  if (error && (error as AxiosError).status === 401) {
    return <Navigate to="/login" replace />;
  }

  if (!data) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
