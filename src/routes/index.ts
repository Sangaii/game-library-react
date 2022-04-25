import Login from '../pages/Login/Login';
import HomeIndex from '../pages/Home/index';

export const routes = [
 { path: '/', component: HomeIndex, key: 'startmenu', exact: true },
 { path: '/login', component: Login, key: 'index' },
];
