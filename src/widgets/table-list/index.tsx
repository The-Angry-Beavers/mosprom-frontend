import { useGetNamespaceById } from '@/entity/namespace/api';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateTableModal } from './ui/create-table-modal';

export const TableList = () => {
  const { namespaceId } = useParams();

  const [open, setOpen] = useState(false);
  const { mockData } = useGetNamespaceById(Number(namespaceId));

  return (
    <>
      <CreateTableModal
        namespaceValue={mockData.name}
        isModalOpen={open}
        handleCancel={() => setOpen(false)}
        handleOk={() => setOpen(false)}
      />
    </>
  );
};
