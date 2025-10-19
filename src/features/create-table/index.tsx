import { useState } from 'react';
import { CreateTableModal } from './ui/create-table-modal';
import { BtnPlus } from '@/shared/ui/btn-plus';
import { notification } from 'antd';

export const CreateModal = ({ namespace }: { namespace: string }) => {
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.success({
      message: 'Таблица успешно создана',
      placement: 'bottomRight',
    });
  };
  return (
    <>
      <BtnPlus onClick={() => setOpen(true)} />
      <CreateTableModal
        namespace={namespace}
        isModalOpen={open}
        handleOk={() => setOpen(false)}
        handleCancel={() => setOpen(false)}
        onNotify={() => openNotification()}
      />
      {contextHolder}
    </>
  );
};
