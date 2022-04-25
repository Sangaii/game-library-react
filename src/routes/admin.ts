import Admin from '@/pages/Admin/Admin';
import Game from '@/pages/Admin/Game';
import User from '@/pages/Admin/User';

//嵌套路由 不需要再写前缀
export const adminRoute = [
 {
  path: 'index',
  component: Admin,
  key: 'adminIndex',
 },
 { path: 'game', component: Game, key: 'gameList' },
 { path: 'user', component: User, key: 'userList' },
];
