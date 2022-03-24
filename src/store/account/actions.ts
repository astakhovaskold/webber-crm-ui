import {LoginAction, LogoutAction, AccountDTO, TYPES} from './types';

export const login = (data: AccountDTO): LoginAction => ({
    type: TYPES.LOGIN,
    data,
});

export const logout = (): LogoutAction => ({
    type: TYPES.LOGOUT,
});
