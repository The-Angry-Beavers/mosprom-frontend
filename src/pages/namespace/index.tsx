import { Empty, Flex, Modal, notification, Skeleton, Table } from 'antd';
import './Namespace.scss';
import { DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { CreateModal } from '@/features/create-table';
import { useDeleteTable, useGetALlNamespace, useGetNamespace } from '@/entity';


type Props = {
  cellKey: string;
  tableId: string;
};

const DeleteCell = ({ cellKey, tableId }: Props) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.success({
      message: 'Таблица успешно удалена',
      placement: 'bottomRight',
    });
  };

  const { mutate: onDeleteTable } = useDeleteTable(openNotification);
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
      {contextHolder}
    </>
  );
};

const columns: ColumnsType = [
  {
    title: 'Название',
    dataIndex: 'verbose_name',
    key: 'verbose_name',
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
      return (
        <DeleteCell tableId={cell.id} cellKey={cell.key} key={cell.key} />
      );
    },
  },
];

export const NameSpacePage = () => {
  const navigate = useNavigate();
  const { namespaceId } = useParams();
  const { data, isLoading } = useGetALlNamespace();

  const namespace = data?.filter((item) => item.id === Number(namespaceId))[0];

  return (
    <div>
      <Flex align="center" justify="space-between">
        <h1 className="namespaceTitle">{namespace?.name}</h1>
        <CreateModal namespace={namespace?.name || ''} />
      </Flex>
      {isLoading && !data && (
        <Flex gap={10} vertical>
          <Skeleton.Node className="namespace-skeleton" />
          <Skeleton.Node className="namespace-skeleton" />
          <Skeleton.Node className="namespace-skeleton" />
        </Flex>
      )}
      {!!namespace?.tables && namespace.tables.length > 0 && !isLoading && (
        <Table
          dataSource={namespace.tables}
          columns={columns}
          onRow={(record) => ({
            onClick: () => navigate(`/table/${record.id}`),
          })}
          pagination={false}
        />
      )}

      {!namespace?.tables.length && !isLoading && (
        <div className="namespace-notFound">
          <Empty description="Нет таблиц" />
        </div>
      )}
    </div>
  );
};
