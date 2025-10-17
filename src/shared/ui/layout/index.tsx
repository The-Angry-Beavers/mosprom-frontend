import { Layout as AntLayout } from 'antd';
import css from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
const { Content } = AntLayout;

type Props = {
  sidebar?: React.ReactNode;
};

export const Layout = ({ sidebar }: Props) => {
  return (
    <AntLayout className={css.layout}>
      {sidebar}
      <AntLayout>
        <Content className={css.content}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
