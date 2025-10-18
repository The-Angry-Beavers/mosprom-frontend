import { PlusOutlined } from '@ant-design/icons';
import type { ButtonHTMLAttributes } from 'react';
import css from './btnPlus.module.scss';
import cn from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;
export const BtnPlus = (props: Props) => {
  return (
    <button {...props} className={cn(css.button, props.className)}>
      <PlusOutlined className={css.icon} />
    </button>
  );
};
