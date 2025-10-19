import { useGetTable } from '@/entity';
import { TablePage } from '.';
import { useParams } from 'react-router-dom';
import { useGetTableRows } from '@/entity/table/api';

export const TablePageLayout = () => {
  const { tableId } = useParams();

  const { data } = useGetTable(tableId || '');
  const { data: rows } = useGetTableRows(tableId || '');
console.log(rows?.data?.rows)
  return <TablePage columnsData={data?.data?.fields || []} rowsData={rows?.data?.rows || []} name={data?.data?.verbose_name || ''} canEdit={false} />;
};
