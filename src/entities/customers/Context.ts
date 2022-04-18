import {createContext} from 'react';

import {CustomerDTO} from './types';

interface CTX {
    item: CustomerDTO;
}

export const Context = createContext<CTX>({item: {} as CustomerDTO});
