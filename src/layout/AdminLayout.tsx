import React from "react";
import { useState } from "react";
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import './AdminLayout.css'
import { useNavigate } from "react-router-dom";
import { adminMenu } from "@/utils/menu";

const { Header, Sider, Content } = Layout;

const AdminLayout = (props: any) => {
  console.log(props);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => { setCollapsed(!collapsed) }

  const selectItem = (selected: any) => {
    // item.props.path
    console.log(selected.item.props.path);
    navigate(selected.item.props.path)
    // 页面跳转方法
  }

  return (<Layout className="layout">
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={adminMenu}
        onClick={selectItem}
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