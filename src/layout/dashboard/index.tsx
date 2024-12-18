import React from "react";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../../supabase/auth";
import { useMutation } from "@tanstack/react-query";

const { Content, Footer, Sider } = Layout;

const items2: MenuProps["items"] = [
  {
    key: "users",
    label: "Users",
    children: [
      {
        key: 0,
        label: <Link to={"users"}>Users</Link>,
      },
    ],
  },
  {
    key: "blogs",
    label: "Blogs",
    children: [
      {
        key: 0,
        label: <Link to={"blogs"}>Blogs</Link>,
      },
    ],
  },
];

const DashboardLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });

  const handleLogaut = () => {
    mutate();
  };

  return (
    <Layout>
      <Header>
        <Button onClick={handleLogaut} type="primary">
          Logout
        </Button>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: "80vh" }}>
            <Outlet />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Admin Panel Created by Giorgi zautashvili
      </Footer>
    </Layout>
  );
};

export default DashboardLayout;
