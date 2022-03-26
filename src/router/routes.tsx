import {lazy} from 'react';

import {ERROR_404} from '../libs/text';

import {RouteItem} from './types';

const LoginPage = lazy(() => import('../entities/account/LoginPage'));
const RegistrationPage = lazy(() => import('../entities/account/RegistrationPage'));
const Home = lazy(() => import('../entities/misc/Home'));
const NotFound = lazy(() => import('../components/errors/NotFound'));
const ChangePasswordPage = lazy(() => import('../entities/account/ChangePasswordPage'));

const all: Array<RouteItem> = [
    {path: '/', element: Home, title: 'Главная', navigation: true},
    {
        path: 'login',
        element: LoginPage,
        title: 'Авторизация',
        free: true,
        restrictedWithAuth: true,
    },
    {
        path: 'register',
        element: RegistrationPage,
        title: 'Регистрация',
        free: true,
        restrictedWithAuth: true,
    },
    {
        path: 'change-password',
        element: ChangePasswordPage,
        title: 'Смена пароля',
    },
    {path: '*', element: NotFound, title: ERROR_404, free: true},
];

export default all;
