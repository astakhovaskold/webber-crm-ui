import {AxiosBasicCredentials} from 'axios';

import {LoginAction, LogoutAction, SetAuthAction, AccountDTO, TYPES, AuthAction} from './types';

export const auth = (data: AxiosBasicCredentials): AuthAction => ({
    type: TYPES.AUTH,
    data,
});

export const login = (data: AccountDTO): LoginAction => ({
    type: TYPES.LOGIN,
    data,
});

export const logout = (): LogoutAction => ({
    type: TYPES.LOGOUT,
});

export const setAuth = (data: AccountDTO): SetAuthAction => ({
    type: TYPES.SET_AUTH,
    data,
});
