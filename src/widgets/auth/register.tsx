import { AuthFooter } from './ui/auth-footer';
import { AuthLayout } from './ui/auth-layout';
import { RegisterForm } from './ui/register-form';

export const Register = () => {
  return (
    <AuthLayout
      title="Регистрация"
      form={<RegisterForm />}
      footer={<AuthFooter type="register" text="Есть аккаунт?" />}
    />
  );
};
