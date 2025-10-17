import { Button, Form, Input, type FormProps } from 'antd';
import type { RegisterFormType } from '../../model/type';
import css from './registerForm.module.scss';

export const RegisterForm = () => {
  const [form] = Form.useForm();

  const onFinish: FormProps<RegisterFormType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  return (
    <Form
      className={css.form}
      layout="vertical"
      form={form}
      onFinish={onFinish}
    >
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
        <Input />
      </Form.Item>

      <Form.Item<RegisterFormType>
        label="Имя"
        name="name"
        rules={[{ required: true, message: 'Пожалуйста введите имя' }]}
        className={css.label}
      >
        <Input />
      </Form.Item>

      <Form.Item<RegisterFormType>
        label="Пароль"
        name="password"
        rules={[
          { required: true, message: 'Пожалуйста введите пароль' },
          { min: 8, message: 'Пароль должен быть не менее 8 символов' },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button className={css.button} type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
