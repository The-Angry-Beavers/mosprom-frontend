import { Empty, Flex, Modal, Skeleton, Table } from 'antd';
import './Namespace.scss';
import { DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CreateModal } from '@/features/create-table';
import { useDeleteTable, useGetAllTables } from '@/entity';

type Props = {
  cellKey: string;
  tableId: string;
};

const DeleteCell = ({ cellKey, tableId }: Props) => {
  const { mutate: onDeleteTable } = useDeleteTable();

  const [openWarning, setOpenWarning] = useState(false);
  return (
    <>
      <DeleteOutlined
        style={{ cursor: 'pointer', color: 'red' }}
        onClick={(e) => {
          e.stopPropagation();
          console.log(cellKey);
          setOpenWarning(true);
        }}
      />
      <Modal
        open={openWarning}
        onCancel={(e) => {
          e.stopPropagation();
          setOpenWarning(false);
        }}
        onOk={(e) => {
          e.stopPropagation();
          onDeleteTable(tableId);
          setOpenWarning(false);
        }}
        okText="Да"
        cancelText="Нет"
      >
        Вы точно хотите удалить таблицу?{' '}
      </Modal>
    </>
  );
};

const columns: ColumnsType = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Дата последнего изменения',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '',
    key: 'delete',
    render: (cell) => {
      console.log(cell);
      return (
        <DeleteCell tableId={cell.table_id} cellKey={cell.key} key={cell.key} />
      );
    },
  },
];

export const NameSpacePage = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllTables();

  return (
    <div>
      <Flex align="center" justify="space-between">
        <h1 className="namespaceTitle">Тестовый проект</h1>
        <CreateModal />
      </Flex>
      {isLoading && !data && (
        <Flex gap={10} vertical>
          <Skeleton.Node className="namespace-skeleton" />
          <Skeleton.Node className="namespace-skeleton" />
          <Skeleton.Node className="namespace-skeleton" />
        </Flex>
      )}
      {data?.length && !isLoading && (
        <Table
          dataSource={data}
          columns={columns}
          onRow={(record) => ({
            onClick: () => navigate(`/table/${record.id}`),
          })}
          pagination={false}
        />
      )}

      {!data?.length && !isLoading && (
        <div className="namespace-notFound">
          <Empty description="Нет таблиц" />
        </div>
      )}
    </div>
  );
};
