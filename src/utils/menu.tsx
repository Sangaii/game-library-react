import { MenuProps } from 'antd';
import {
  BookOutlined,
  BuildOutlined,
  UserOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  path?: string | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    path
  } as MenuItem;
}

export const adminMenu: MenuItem[] = [
  // getItem('Option 1', '1', <PieChartOutlined />),
  // getItem('Option 2', '2', <DesktopOutlined />),
  // getItem('Option 3', '3', <ContainerOutlined />),

  getItem('权限管理', 'authManage', '', <BookOutlined />, [
    getItem('角色管理', 'roleManage'),
  ]),

  getItem('游戏管理', 'gameManage', '', <BuildOutlined />, [
    getItem('游戏列表', 'gameList', '/admin/game'),
    // getItem('Option 10', '10'),

    // getItem('Submenu', 'sub3', '', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
  getItem('用户管理', 'userManage', '', <UserOutlined />, [
    getItem('用户列表', 'userList', '/admin/user'),
    // getItem('Option 10', '10'),

    // getItem('Submenu', 'sub3', '', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];