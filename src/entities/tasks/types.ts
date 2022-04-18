/**
 * Created by ASTAKHOV A.A. on 28.03.2022
 */

import {Common, Num, Timestamps} from '../../../typings/common';
import {valueDateView} from '../../components/view/DateView';
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

export interface StatusDTO extends Common {
    status: STATUS;
    status_name: string;
}

export interface TaskDTO extends Common, Timestamps, Num {
    title: string;
    description?: string;
    is_active: boolean;
    is_archive: boolean;
    is_done: boolean;
    author: UserDTO['_id'];
    customer: CustomerDTO;
    project: string;
    status: StatusDTO;
    deadline?: valueDateView;
    estimate?: number;
    actually?: number;
    is_fixed_price: boolean;
    price: number;
}

export interface TaskFormValues extends Omit<TaskDTO, 'status' | 'customer'> {
    status: StatusDTO['_id'];
    customer: CustomerDTO['_id'];
}

export interface TaskFilter extends PaginationFilter {
    is_archive: boolean;
    is_done: boolean;
}
