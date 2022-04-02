import {createContext} from 'react';

import {TaskDTO} from './types';

interface CTX {
    item: TaskDTO;
}

export const Context = createContext<CTX>({item: {} as TaskDTO});
