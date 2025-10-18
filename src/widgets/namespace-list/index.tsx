import type { NamespaceType } from '@/entity';
import { NamespaceCard } from './ui/namespace-card';
import { Link } from 'react-router-dom';
import css from './namespaceList.module.scss';
import { Form, Input, Modal } from 'antd';
import { useState } from 'react';
type Props = {
  items: NamespaceType[];
};

const NamespaceModal = ({
  open,
  setOpen,
  onSubmit,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
}) => {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      onOk={onSubmit}
      okText="Создать"
      cancelText="Отмена"
    >
      <h2>Создание проекта</h2>
      <Form>
        <Form.Item label="Название проекта">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const NamespaceList = ({ items }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={css.namespaceList}>
      {items.map((item, index) => (
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
        onSubmit={() => setOpen(false)}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};
