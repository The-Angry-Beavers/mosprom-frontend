import { Button, Flex, Form, Input, notification, type FormProps } from 'antd';
import type { RegisterFormType } from '../../model/type';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useRegister } from '@/entity/auth';

export const RegisterForm = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.success({
      message: 'Вы успешно зарегистрировались!',
      placement: 'bottomRight',
    });
    form.resetFields();
  };

  const { mutate } = useRegister(openNotification);

  const onFinish: FormProps<RegisterFormType>['onFinish'] = (values) => {
    mutate(values);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item<RegisterFormType>
        label="Email"
        name="email"
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
        <Input type="email" size="large" prefix={<MailOutlined />} />
      </Form.Item>

      <Flex vertical gap={20}>
        <Form.Item<RegisterFormType>
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста введите пароль' },
            { min: 8, message: 'Пароль должен быть не менее 8 символов' },
          ]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" size="large" block>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Flex>
      {contextHolder}
    </Form>
  );
};
