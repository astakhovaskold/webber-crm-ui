/**
 * Created by ASTAKHOV A.A. on 28.03.2022
 */

import {CommonDB, Timestamps} from '../../../typings/common';
import {UserDTO} from '../../store/account/types';

export interface ServiceDTO extends CommonDB {
    service: string;
    service_name: string;
}

export interface CustomerDTO extends CommonDB, Timestamps {
    name: string;
    price: number;
    is_active: boolean;
    user: UserDTO['_id'];
    projects?: Array<string>;
    service?: ServiceDTO;
}
