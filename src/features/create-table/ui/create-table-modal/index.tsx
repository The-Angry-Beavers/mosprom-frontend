import { Modal } from "antd";

import { CreateTableForm } from "../create-table-form";

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  namespace: string;
};

export const CreateTableModal = ({
  handleCancel,
  handleOk,
  isModalOpen,
  namespace,
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
      <CreateTableForm namespace={namespace} />
    </Modal>
  );
};
