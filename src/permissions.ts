import {ROLE} from './store/account/types';

export const USER_EDIT = [ROLE.USER];
export const USER_VIEW = USER_EDIT;

export const TASK_EDIT = [ROLE.USER];
export const TASK_VIEW = TASK_EDIT;

export const USER_SECTION = Array.from(new Set([...USER_VIEW, ...TASK_VIEW]));
