import type { CreateTableType } from '@/entity';
import { Form, Input, Flex, Button, type FormInstance } from 'antd';
import css from './createBaseFields.module.scss';
type Props = {
  nextStep: () => void;
  form: FormInstance<CreateTableType>;
};

export const CreateBaseFields = ({ nextStep, form }: Props) => {

  return (
    <div className={css.createBaseFields}>
      <Form.Item<CreateTableType> label="Пространство" name="namespace">
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

        <Form.Item shouldUpdate>
          {() => (
            <Button
              disabled={!form.getFieldValue('name')}
              onClick={nextStep}
              block
              type="primary"
              size="large"
              htmlType="submit"
            >
              Далее
            </Button>
          )}
        </Form.Item>
      </Flex>
    </div>
  );
};
