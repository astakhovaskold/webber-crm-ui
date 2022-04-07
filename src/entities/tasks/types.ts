/**
 * Created by ASTAKHOV A.A. on 28.03.2022
 */
import {Common, Timestamps} from '../../../typings/common';
import {UserDTO} from '../../store/account/types';
import {PaginationFilter} from '../../store/pagination/types';
import {CustomerDTO} from '../customers/types';

export enum STATUS {
    NEW = 'NEW',
    SCHEDULED = 'SCHEDULED',
    WORKING = 'WORKING',
    TESTING = 'TESTING',
    REVERSED = 'REVERSED',
    DONE = 'DONE',
}

export interface TaskStatus {
    status: STATUS;
    status_name: string;
}

interface TaskTime {
    estimate: number;
    fact: number;
    calc: number;
}

export interface TaskDTO extends Common, Timestamps {
    title: string;
    description?: string;
    is_active: boolean;
    author: UserDTO['id'];
    customer: CustomerDTO;
    status: TaskStatus;
    time?: TaskTime;
}

export interface TaskFilter extends PaginationFilter {
    show_inactive: boolean;
}
