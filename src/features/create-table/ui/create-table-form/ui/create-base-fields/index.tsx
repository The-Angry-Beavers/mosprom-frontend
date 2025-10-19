import type { CreateTableDto } from '@/entity';
import { Form, Input, Flex, Button, type FormInstance } from 'antd';
import css from './createBaseFields.module.scss';
type Props = {
  nextStep: () => void;
  form: FormInstance<CreateTableDto>;
};

export const CreateBaseFields = ({ nextStep, form }: Props) => {
  return (
    <div className={css.createBaseFields}>
      <Form.Item<CreateTableDto> label="Пространство" name="namespace">
        <Input readOnly type="text" size="large" />
      </Form.Item>

      <Flex gap={20} vertical>
        <Form.Item<CreateTableDto>
          label="Название таблицы"
          name="verbose_name"
          rules={[
            { required: true, message: 'Пожалуйста введите имя таблицы' },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item<CreateTableDto>
          label="Описание таблицы"
          name="description"
          rules={[
            { required: true, message: 'Пожалуйста введите имя таблицы' },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              disabled={!form.getFieldValue('verbose_name') || !form.getFieldValue('description')}
              onClick={nextStep}
              block
              type="primary"
              size="large"
            >
              Далее
            </Button>
          )}
        </Form.Item>
      </Flex>
    </div>
  );
};
