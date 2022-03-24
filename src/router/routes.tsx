import NotFound from '../components/errors/NotFound';
import LoginPage from '../entities/account/LoginPage';
import Home from '../entities/misc/Home';
import {ERROR_404} from '../libs/text';

import {RouteItem} from './types';

const all: Array<RouteItem> = [
    {path: '/', element: <Home />, title: 'Главная'},
    {path: 'login', element: <LoginPage />, title: 'Авторизация', free: true, navigation: false},
    {path: '*', element: <NotFound />, title: ERROR_404, free: true, navigation: false},
];

export default all;
