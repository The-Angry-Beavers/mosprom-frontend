import { Login } from '@/widgets';
import css from './login.module.scss';

export const LoginPage = () => {
  return (
    <div className={css.login}>
      <Login />
    </div>
  );
};
