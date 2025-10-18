import { Link } from 'react-router-dom';
import type { AuthType } from '../../model/type';
import css from './authFooter.module.scss';

type Props = {
  type: AuthType;
  text: string;
};

export const AuthFooter = ({ type, text }: Props) => {
  return (
    <p className={css.authFooter}>
      {text}
      <Link to={type === 'login' ? '/register' : '/login'}>
        {type === 'login' ? 'Зарегистрироваться' : 'Войти'}
      </Link>
    </p>
  );
};
