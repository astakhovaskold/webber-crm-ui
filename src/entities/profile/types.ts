/**
 * Created by ASTAKHOV A.A. on 26.04.2022
 */

import {UserDTO} from '../../store/account/types';

export type FormProfileValues = Omit<UserDTO, '_id'>;
