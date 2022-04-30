import {createContext} from 'react';

import {UserDTO} from '../../store/account/types';

interface CTX {
    item: UserDTO;
}

export const Context = createContext<CTX>({item: {} as UserDTO});
