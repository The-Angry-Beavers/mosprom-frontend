import type { CreateTableType } from '@/entity';
import { Form, Input, Flex, Button } from 'antd';
import css from './createBaseFields.module.scss';
type Props = {
  nextStep: () => void;
};

export const CreateBaseFields = ({ nextStep }: Props) => {
  return (
    <div className={css.createBaseFields}>
      <Form.Item<CreateTableType>
        label="Пространство"
        name="namespace"
        rules={[{ required: true, message: 'Пожалуйста введите пространство' }]}
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

        <Form.Item>
          <Button onClick={nextStep} block type="primary" size="large">
            Далее
          </Button>
        </Form.Item>
      </Flex>
    </div>
  );
};
