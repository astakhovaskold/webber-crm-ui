/**
 * Created by ASTAKHOV A.A. on 28.03.2022
 */

import {Common, Timestamps} from '../../../typings/common';
import {UserDTO} from '../../store/account/types';

export interface ServiceDTO extends Common {
    service: string;
    service_name: string;
}

export interface CustomerDTO extends Common, Timestamps {
    name: string;
    price: number;
    is_active: boolean;
    user: UserDTO['_id'];
    projects?: Array<string>;
    service?: ServiceDTO;
}

export interface CustomerFormValues extends Omit<CustomerDTO, 'service'> {
    service?: ServiceDTO['_id'];
}
