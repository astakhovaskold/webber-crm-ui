/**
 * Created by ASTAKHOV A.A. on 28.03.2022
 */

import {Common, CommonDB, Timestamps} from '../../../typings/common';
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

export interface StatusDTO extends CommonDB {
    status: STATUS;
    status_name: string;
}

export interface TaskDTO extends Common, Timestamps {
    title: string;
    description?: string;
    is_active: boolean;
    is_archive: boolean;
    author: UserDTO['id'];
    customer: CustomerDTO;
    status: StatusDTO;
    estimate?: number;
    actually?: number;
    deadline?: valueDateView;
}

export interface TaskFilter extends PaginationFilter {
    show_inactive: boolean;
}
