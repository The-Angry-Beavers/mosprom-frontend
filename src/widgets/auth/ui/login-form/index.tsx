import { Button, Flex, Form, Input, type FormProps } from "antd";
import type { LoginFormType } from "../../model/type";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

export const LoginForm = () => {
  const [form] = Form.useForm();

  const onFinish: FormProps<LoginFormType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item<LoginFormType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Пожалуйста введите email" }]}
      >
        <Input type="email" prefix={<MailOutlined />} size="large" />
      </Form.Item>
      <Flex gap={20} vertical>
        <Form.Item<LoginFormType>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Пожалуйста введите пароль" }]}
        >
          <Input.Password prefix={<LockOutlined />} size="large" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" size="large" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};
