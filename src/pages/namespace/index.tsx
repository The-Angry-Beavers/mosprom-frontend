import { Flex, Modal, Table } from 'antd';
import './Namespace.scss';
import { DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CreateModal } from '@/features/create-table';

const DeleteCell = ({ cellKey }: { cellKey: string }) => {
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

const dataSource = [
  {
    key: '1',
    name: 'Таблица1',
    date: '02/03/2023',
  },
  {
    key: '2',
    name: 'Таблица2',
    date: '04/03/2023',
  },
];

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
    render: (cell) => <DeleteCell cellKey={cell.key} key={cell.key} />,
  },
];

export const NameSpacePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Flex align="center" justify="space-between">
        <h1 className="namespaceTitle">Тестовый проект</h1>
        <CreateModal />
      </Flex>
      <Table
        dataSource={dataSource}
        columns={columns}
        onRow={(record) => ({
          onClick: () => navigate(`/table/${record.key}`),
        })}
      />
      ;
    </div>
  );
};
