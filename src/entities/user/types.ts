import {Common} from '../../../typings/common';
import {ROLE} from '../../store/account/types';

export interface UserDTO extends Common {
    username: string;
    email: string;
    password: string;
    reset: {
        token: string;
        expires: string;
    };
    price: number;
    name: {
        first: string;
        middle: string;
        last: string;
    };
    role: ROLE;
}
