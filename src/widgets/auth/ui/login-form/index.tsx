import { Button, Flex, Form, Input, type FormProps } from 'antd';
import type { LoginFormType } from '../../model/type';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useLogin } from '@/entity/auth';
import type { AxiosError } from 'axios';
import { getError } from '../../lib/getError';

export const LoginForm = () => {
  const [form] = Form.useForm();

  const { mutate, error } = useLogin();

  const onFinish: FormProps<LoginFormType>['onFinish'] = (values) => {
    mutate(values);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item<LoginFormType>
        label="Email"
        name="username"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите email',
          },
          {
            type: 'email',
            message: 'Некорректная почта',
          },
        ]}
      >
        <Input prefix={<MailOutlined />} size="large" />
      </Form.Item>
      <Flex gap={20} vertical>
        <Form.Item<LoginFormType>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
        >
          <Input.Password prefix={<LockOutlined />} size="large" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" size="large" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
        {error && (error as AxiosError).response && (
          <div style={{ color: 'red' }}>{getError(error as AxiosError)}</div>
        )}
      </Flex>
    </Form>
  );
};
