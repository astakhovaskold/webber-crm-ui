import {createContext} from 'react';

import {TaskDTO} from './types';

interface Ctx {
    item: TaskDTO;
}

// @ts-ignore
export const Context = createContext<Ctx>(null);
