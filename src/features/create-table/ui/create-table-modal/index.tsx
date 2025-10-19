import { Modal } from 'antd';

import { CreateTableForm } from '../create-table-form';

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  namespace: string;
  onNotify?: () => void;
};

export const CreateTableModal = ({
  handleCancel,
  handleOk,
  isModalOpen,
  namespace,
  onNotify,
}: Props) => {
  return (
    <Modal
      title="Создание таблицы"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={700}
    >
      <CreateTableForm
        onNotify={onNotify}
        handleClose={handleOk}
        namespace={namespace}
      />
    </Modal>
  );
};
