import type { CreateTableType } from '@/entity';
import { InboxOutlined } from '@ant-design/icons';

import {
  Button,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Upload,
  type UploadProps,
} from 'antd';

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },

  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const { Dragger } = Upload;

export const CreateTableModal = ({
  handleCancel,
  handleOk,
  isModalOpen,
}: Props) => {
  return (
    <Modal
      title="Создание таблицы"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item<CreateTableType>
          label="Пространство"
          name="namespace"
          rules={[
            { required: true, message: 'Пожалуйста введите пространство' },
          ]}
        >
          <Input disabled type="text" size="large" />
        </Form.Item>

        <Flex gap={20} vertical>
          <Form.Item<CreateTableType>
            label="Название таблицы"
            name="name"
            rules={[
              { required: true, message: 'Пожалуйста введите имя таблицы' },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item name="">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Загрузите ваш Exel файл</p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" size="large" htmlType="submit">
              Создать таблицу
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};
