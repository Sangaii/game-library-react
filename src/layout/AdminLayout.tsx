import React from "react";
import { useState } from "react";
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './AdminLayout.css'

const { Header, Sider, Content } = Layout;

const AdminLayout = (props: any) => {
  console.log(props);
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => { setCollapsed(!collapsed) }

  return (<Layout className="layout">
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          },
        ]}
      />
    </Sider>
    <Layout className="site-layout">
      <Header className="adminHeader site-layout-background" style={{ padding: 0 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: toggle,
        })}
      </Header>
      <Content
        className="adminContentWrap site-layout-background "
        style={{
          margin: '24px 16px',
          padding: 24,
        }}
      >
        {props.children}
      </Content>
    </Layout>
  </Layout>)
}

export default AdminLayout