import { useGetTable } from '@/entity';
import { TablePage } from '.';
import { useParams } from 'react-router-dom';

export const TablePageLayout = () => {
  const { tableId } = useParams();

  const { data } = useGetTable(tableId || '');

  console.log(data)

  return <TablePage columnsData={[]} rowsData={[]} canEdit={false} />;
};
