import css from './authLayout.module.scss';

type Props = {
  title: string;
  form?: React.ReactNode;
  footer?: React.ReactNode;
};

export const AuthLayout = ({ title, footer, form }: Props) => {
  return (
    <div className={css.authLayout}>
      <div className={css.title}>
        <h1>{title}</h1>
      </div>
      <div className={css.form}>{form}</div>
      <div className={css.footer}>{footer}</div>
    </div>
  );
};
