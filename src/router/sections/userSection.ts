import {lazy} from 'react';

import {USER_SECTION, TASK_VIEW, CUSTOMER_VIEW} from '../../permissions';
import {RouteItem} from '../types';

// const Section = lazy(() => import('../Section'));

const TaskList = lazy(() => import('../../entities/tasks/List'));
const TaskPage = lazy(() => import('../../entities/tasks/Page'));

const CustomerList = lazy(() => import('../../entities/customers/List'));
const CustomerPage = lazy(() => import('../../entities/customers/Page'));

const ProfilePage = lazy(() => import('../../entities/profile/Page'));

const userSection: Array<RouteItem> = [
    {
        path: 'tasks',
        title: 'Задачи',
        element: TaskList,
        roles: USER_SECTION,
        navigation: true,
        children: [
            {
                path: ':id',
                title: 'Задача',
                element: TaskPage,
                roles: TASK_VIEW,
            },
        ],
    },
    {
        path: 'customers',
        title: 'Клиенты',
        element: CustomerList,
        roles: USER_SECTION,
        navigation: true,
        children: [
            {
                path: ':id',
                title: 'Клиент',
                element: CustomerPage,
                roles: CUSTOMER_VIEW,
            },
        ],
    },
    {
        path: 'profile',
        title: 'Профиль',
        element: ProfilePage,
        roles: USER_SECTION,
        navigation: false,
    },
];

export default userSection;
