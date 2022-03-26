import {
    LoginAction,
    LogoutAction,
    AccountDTO,
    TYPES,
    SetAuthAction,
    AuthAction,
    AuthData,
    RegisterAction,
} from './types';

export const auth = (data: AuthData): AuthAction => ({
    type: TYPES.AUTH,
    data,
});

export const login = (data: AccountDTO): LoginAction => ({
    type: TYPES.LOGIN,
    data,
});

export const register = (data: AuthData): RegisterAction => ({
    type: TYPES.REGISTER,
    data,
});

export const logout = (): LogoutAction => ({
    type: TYPES.LOGOUT,
});

export const setAuth = (data: AccountDTO): SetAuthAction => ({
    type: TYPES.SET_AUTH,
    data,
});
