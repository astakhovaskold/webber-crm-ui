import {ROLE} from './store/account/types';

export const USER_EDIT = [ROLE.ADMIN];
export const USER_VIEW = USER_EDIT;

export const ADMIN_SECTION = Array.from(new Set([...USER_VIEW]));
