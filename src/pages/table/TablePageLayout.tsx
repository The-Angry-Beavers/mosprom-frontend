import { useGetTable } from '@/entity';
import { TablePage } from '.';
import { useParams } from 'react-router-dom';
import { useGetTableRows } from '@/entity/table/api';
import { useConnectSession, useGetSession } from '@/entity/sessions';
import { useEffect } from 'react';
import { useSession } from '@/entity/sessions/store';

import { useAuth } from '@/entity/user/store';
import { sessionService } from '@/shared/api/services/session.service';

export const TablePageLayout = () => {
  const { tableId } = useParams();

  const { data } = useGetTable(tableId || '');
  const { data: rows } = useGetTableRows(tableId || '');

  const { user } = useAuth();

  const { mutate, data: sessionData } = useConnectSession();
  const { session, deleteSession } = useSession();
  const { data: sessions } = useGetSession(tableId || '');

  const handleDisconect = async () => {
    await sessionService.closeSession(`${session?.id}`);
  };

  useEffect(() => {
    if (!session) {
      mutate();
    }

    return () => {
      deleteSession();
    };
  }, []);

  return (
    <TablePage
      columnsData={data?.data?.fields || []}
      rowsData={rows?.data?.rows || []}
      name={data?.data?.verbose_name || ''}
      canEdit={false}
    />
  );
};
