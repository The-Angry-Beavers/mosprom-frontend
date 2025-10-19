import { Avatar, Flex, Menu } from "antd";
import "./Sidebar.scss";
import {
  HomeOutlined,
  LogoutOutlined,
  ProjectOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/entity/user/store";
import { useLogout } from "@/entity/auth";
import { useGetALlNamespace } from "@/entity";

export const Sidebar = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { data } = useGetALlNamespace();
  const { user } = useAuth();

  return (
    <Flex vertical className={"menuContainer"} justify="center" gap={42}>
      <Flex align="center" gap={6} className="menuAvatarContainer">
        <Avatar size={60} src="https://placecats.com/300/200" />
        <Flex vertical className="menuAvatarLabel" gap={6}>
          <span style={{ cursor: "default" }}>{user?.email}</span>
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
        items={[
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
          ...(data?.map((item) => ({
            key: item.id.toString(),
            label: (
              <Link
                to={`/namespace/${item.id}`}
                onClick={(e) => e.stopPropagation()}
                title={item.name}
              >
                {item.name}
              </Link>
            ),
            icon: <ProjectOutlined />,
            children: item.tables.slice(0, 5).map((table) => ({
              key: table.id.toString(),
              label: (
                <Link
                  to={`/table/${table.id}`}
                  onClick={(e) => e.stopPropagation()}
                  title={table.verbose_name}
                >
                  {table.verbose_name}
                </Link>
              ),
              icon: <TableOutlined />,
            })),
          })) || [
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
          ]),
        ]}
      />
    </Flex>
  );
};
