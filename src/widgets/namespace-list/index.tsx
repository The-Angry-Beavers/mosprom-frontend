import type { NamespaceType } from '@/entity';
import { NamespaceCard } from './ui/namespace-card';
import { Link } from 'react-router-dom';
import css from './namespaceList.module.scss';
import { Form, Input, Modal, notification } from 'antd';
import { useState } from 'react';
import { useCreateNamespace } from '@/entity/namespace/api';
import type { CreateTableDto } from '@/entity/namespace';
type Props = {
  items?: NamespaceType[];
};

const NamespaceModal = ({
  open,
  setOpen,
  onSubmit,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (values: CreateTableDto) => void;
}) => {
  const [form] = Form.useForm<CreateTableDto>();
  const onFinish = (values: CreateTableDto) => {
    onSubmit(values);
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => form.submit()}
      okText="Создать"
      cancelText="Отмена"
    >
      <h2>Создание проекта</h2>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          rules={[{ required: true, message: 'Введите название проекта' }]}
          name="name"
          label="Название проекта"
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: 'Введите описание проекта' }]}
          name="description"
          label="Описание проекта"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const NamespaceList = ({ items }: Props) => {
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.success({
      message: 'Проект успешно создан',
      placement: 'bottomRight',
    });
  };

  const { mutate } = useCreateNamespace(openNotification);

  return (
    <div className={css.namespaceList}>
      {items &&
        items.length > 0 &&
        items.map((item, index) => (
          <Link key={index} className={css.link} to={`/namespace/${item.id}`}>
            <NamespaceCard namespace={item} />
          </Link>
        ))}
      <NamespaceCard
        namespace={{
          id: 0,
          name: 'Добавить проект',
          description: '',
          tables: [],
        }}
        addCard
        onClick={() => setOpen(true)}
      />
      <NamespaceModal
        onSubmit={(dto) => mutate(dto)}
        open={open}
        setOpen={setOpen}
      />
      {contextHolder}
    </div>
  );
};
