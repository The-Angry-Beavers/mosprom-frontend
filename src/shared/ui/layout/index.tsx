import { Layout as AntLayout } from "antd";
import css from "./Layout.module.scss";
import { Outlet } from "react-router-dom";

type Props = {
  sidebar?: React.ReactNode;
};

export const Layout = ({ sidebar }: Props) => {
  return (
    <AntLayout className={css.layout}>
      <AntLayout.Sider className={css.sider}>{sidebar}</AntLayout.Sider>
      <AntLayout.Content className={css.content}>
        <Outlet />
      </AntLayout.Content>
    </AntLayout>
  );
};
