import { Button, Form, Input, type FormProps } from 'antd';
import type { LoginFormType } from '../../model/type';
import css from './loginForm.module.scss';

export const LoginForm = () => {
  const [form] = Form.useForm();

  const onFinish: FormProps<LoginFormType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  return (
    <Form className={css.form} layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item<LoginFormType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Пожалуйста введите email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<LoginFormType>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button className={css.button} type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
