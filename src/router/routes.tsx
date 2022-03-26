import {lazy} from 'react';

import {ERROR_404} from '../libs/text';

import {RouteItem} from './types';

const LoginPage = lazy(() => import('../entities/account/LoginPage'));
const RegistrationPage = lazy(() => import('../entities/account/RegistrationPage'));
const Home = lazy(() => import('../entities/misc/Home'));
const NotFound = lazy(() => import('../components/errors/NotFound'));

const all: Array<RouteItem> = [
    {path: '/', element: Home, title: 'Главная'},
    {
        path: 'login',
        element: LoginPage,
        title: 'Авторизация',
        free: true,
        navigation: false,
        restrictedWithAuth: true,
    },
    {
        path: 'register',
        element: RegistrationPage,
        title: 'Регистрация',
        free: true,
        navigation: false,
        restrictedWithAuth: true,
    },
    {path: '*', element: NotFound, title: ERROR_404, free: true, navigation: false},
];

export default all;
