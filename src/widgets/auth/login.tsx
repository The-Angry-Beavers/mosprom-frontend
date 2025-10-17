import { AuthFooter } from './ui/auth-footer';
import { AuthLayout } from './ui/auth-layout';
import { LoginForm } from './ui/login-form';

export const Login = () => {
  return (
    <AuthLayout
      title="Вход"
      form={<LoginForm />}
      footer={<AuthFooter type="login" text="Нет аккаунта?" />}
    />
  );
};
