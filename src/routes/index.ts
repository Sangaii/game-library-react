import Login from '../views/Login/Login';
import HomeIndex from '../views/Home/index';

export const routes = [
 { path: '/', component: HomeIndex, key: 'startmenu', exact: true },
 { path: '/login', component: Login, key: 'index' },
];
