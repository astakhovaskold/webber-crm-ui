import {lazy} from 'react';

import {ERROR_404} from '../libs/text';

import {RouteItem} from './types';

const LoginPage = lazy(() => import('../entities/account/LoginPage'));
const RegistrationPage = lazy(() => import('../entities/account/RegistrationPage'));
const Home = lazy(() => import('../entities/misc/Home'));
const NotFound = lazy(() => import('../components/errors/NotFound'));
const ChangePasswordPage = lazy(() => import('../entities/account/ChangePasswordPage'));
const ResetPasswordPage = lazy(() => import('../entities/account/ResetPasswordPage'));
const NewPasswordPage = lazy(() => import('../entities/account/NewPasswordPage'));

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
    {
        path: 'reset-password',
        element: ResetPasswordPage,
        title: 'Смена пароля',
        free: true,
        restrictedWithAuth: true,
    },
    {
        path: 'new-password/:token',
        element: NewPasswordPage,
        title: 'Новый пароль',
        free: true,
        restrictedWithAuth: true,
    },
    {path: '*', element: NotFound, title: ERROR_404, free: true},
];

export default all;
