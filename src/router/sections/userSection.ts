import {lazy} from 'react';

import {USER_SECTION, TASK_VIEW} from '../../permissions';
import {RouteItem} from '../types';

// const Section = lazy(() => import('../Section'));

const TaskList = lazy(() => import('../../entities/tasks/List'));
const TaskPage = lazy(() => import('../../entities/tasks/Page'));

const userSection: RouteItem = {
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
};

export default userSection;
