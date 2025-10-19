import { sessionService } from '@/shared/api/services/session.service';
import { QUERY_KEY } from '@/shared/config/querykey';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useSession } from './store';
import { useParams } from 'react-router-dom';

export const useGetSession = (tableId: string) => {

  const query = useQuery({
    queryKey: [QUERY_KEY.GET_SESSIONS],
    queryFn: async () => await sessionService.getSession(tableId),
    select: (data) => data.data,
  });

  return query;
};

export const useGetSessionMe = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_SESSIONS_ME],
    queryFn: async () => await sessionService.getSessionMe(),
    select: (data) => data.data,
  });

  return query;
};

export const useConnectSession = () => {
  const { setSession } = useSession();

  const { tableId } = useParams<{ tableId: string }>();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY.CONNECT_SESSION],
    mutationFn: async () => await sessionService.connectSession(`${tableId}`),
    onSuccess: (data) => setSession(data.data),
  });

  return mutation;
};

export const useCloseSession = () => {
  const { session } = useSession();

  const query = useQuery({
    queryKey: [QUERY_KEY.CLOSE_SESSION],
    queryFn: async () => await sessionService.closeSession(`${session?.id}`),
    select: (data) => data.data,
  });

  return query;
};
