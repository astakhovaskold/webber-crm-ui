import {createContext, Dispatch} from 'react';

import {TaskDTO} from './types';

type Ctx = [item: TaskDTO, setItem: Dispatch<TaskDTO>];

// @ts-ignore
export const Context = createContext<Ctx>(null);
