import { type MenuProps, Layout as AntLayout, Menu } from 'antd';
import css from './Sidebar.module.scss';
const { Sider } = AntLayout;

const items2: MenuProps['items'] = [0, 0, 0].map((_, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    label: `subnav ${key}`,
  };
});

export const Sidebar = () => {
  return (
    <Sider width={200}>
      <Menu
        className={css.menu}
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderInlineEnd: 0 }}
        items={items2}
      />
    </Sider>
  );
};
