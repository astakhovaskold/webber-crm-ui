// import {ERROR_404} from '../libs/text';

import {lazy} from 'react';

import {ERROR_404} from '../libs/text';

import {RouteItem} from './types';

const Home = lazy(() => import('../entities/misc/Home'));
const LoginPage = lazy(() => import('../entities/account/LoginPage'));
const NotFound = lazy(() => import('../components/errors/NotFound'));

const all: Array<RouteItem> = [
    {path: '/', element: Home, title: 'Главная'},
    {path: 'login', element: LoginPage, title: 'Авторизация', free: true},
    {path: '*', element: NotFound, title: ERROR_404, free: true},
];

export default all;
