import { type MenuProps, Avatar, Flex, Menu } from "antd";
import "./Sidebar.scss";
import {
	HomeOutlined,
  LogoutOutlined,
  ProjectOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "./lib/useLogout";

const items2: MenuProps["items"] = [
  {
    key: `sub`,
    label: (
      <Link
        onClick={(e) => {
          e.stopPropagation();
        }}
        to="/"
        title="Главная"
      >
        Главная
      </Link>
    ),
    title: "Главная",
    icon: <HomeOutlined />,
  },
  {
    key: `sub`,
    label: (
      <Link
        onClick={(e) => {
          e.stopPropagation();
        }}
        to="/namespace/1"
        title="Проект 1"
      >
        "Проект 1"
      </Link>
    ),
    title: "Проект 1",
    icon: <ProjectOutlined />,
  },
  {
    key: `sub2`,
    label: (
      <Link
        onClick={(e) => {
          e.stopPropagation();
        }}
        to="/namespace/2"
        title="Проект 2 с очень длинным названием с очень длинным названием с очень
        длинным названием"
      >
        Проект 2 с очень длинным названием с очень длинным названием с очень
        длинным названием
      </Link>
    ),
    title:
      "Проект 2 с очень длинным названием с очень длинным названием с очень длинным названием",
    icon: <ProjectOutlined />,
    children: [
      {
        key: `тАБЛИЦА1`,
        label: <Link to="/table/1">`тАБЛИЦА1`</Link>,
        title: `тАБЛИЦА1`,
        icon: <TableOutlined />,
      },
      {
        key: `тАБЛИЦА2`,
        label: <Link to="/table/2">`тАБЛИЦА2`</Link>,
        title: `тАБЛИЦА2`,
        icon: <TableOutlined />,
      },
      {
        key: `тАБЛИЦА3`,
        label: <Link to="/table/3">`тАБЛИЦА3`</Link>,
        title: `тАБЛИЦА3`,
        icon: <TableOutlined />,
      },
    ],
  },
];

export const Sidebar = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  return (
    <Flex
      vertical
      className={"menuContainer"}
      justify="center"
      gap={42}
    >
      <Flex align="center" gap={6} className="menuAvatarContainer">
        <Avatar size={60} src="https://placecats.com/300/200" />
        <Flex vertical className="menuAvatarLabel" gap={6}>
          <span style={{ cursor: "default" }}>Имя фамилия</span>
          <Flex
            onClick={() => {
              logout();
              navigate("/login");
            }}
            role="button"
            gap={4}
            className="menuAvatarLogout"
          >
            <LogoutOutlined />
            Выйти
          </Flex>
        </Flex>
      </Flex>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        className={"menu"}
        style={{ height: "100%", borderInlineEnd: 0 }}
        items={items2}
      />
    </Flex>
  );
};
