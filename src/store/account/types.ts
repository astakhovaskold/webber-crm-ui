import {AxiosBasicCredentials} from 'axios';

import {Common} from '../../../typings/common';

export enum TYPES {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    SET_AUTH = 'SET_AUTH',
    AUTH = 'AUTH',
}

export enum ROLE {
    ADMIN = 'ADMIN',
    OBSERVER = 'OBSERVER',
    USER = 'USER',
    SECURITY_ADMIN = 'SECURITY_ADMIN',
}

export interface AccountState {
    readonly account?: AccountDTO;
    readonly loggedOut: boolean;
}

export interface UserDTO extends Common {
    username: string;
    email: string;
    role?: ROLE;
}

export interface AccountDTO {
    user: UserDTO;
    access_token: string;
    refresh_token: string;
}

export interface PasswordData {
    password?: string;
    confirmPassword?: string;
}

export interface AuthAction {
    type: TYPES.AUTH;
    data: AxiosBasicCredentials;
}

export interface LoginAction {
    type: TYPES.LOGIN;
    data: AccountDTO;
}

export interface LogoutAction {
    type: TYPES.LOGOUT;
}

export interface SetAuthAction {
    type: TYPES.SET_AUTH;
    data: AccountDTO;
}

export type actions = AuthAction | LoginAction | LogoutAction | SetAuthAction;
