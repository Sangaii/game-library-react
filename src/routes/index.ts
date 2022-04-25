import Login from '@pages/Login/Login';
import HomeIndex from '@pages/Home/index';
import AdminIndex from '@pages/Admin/index';

export const routes = [
 { path: '/', component: HomeIndex, key: 'startmenu' },
 { path: '/login', component: Login, key: 'login' },
 { path: '/admin/*', component: AdminIndex, key: 'admin' },
];
