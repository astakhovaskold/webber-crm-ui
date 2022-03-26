import {Common} from '../../../typings/common';

export enum TYPES {
    REGISTER = 'REGISTER',
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

interface UserName {
    first: string;
    last: string;
    middle: string;
}

export interface JobDTO extends Common {
    name: string;
}

export interface UserDTO extends Common {
    name: UserName;
    email: string;
    salary: number;
    job: JobDTO;
    is_active: boolean;
    role?: ROLE;
}

export interface AccountDTO {
    user: UserDTO;
    accessToken: string;
    refreshToken: string;
}

export interface AuthData {
    email: UserDTO['email'];
    password: string;
}

export interface LogoutData {
    quiet?: boolean;
}

export interface AuthAction {
    type: TYPES.AUTH;
    data: AuthData;
}

export interface RegisterAction {
    type: TYPES.REGISTER;
    data: AuthData;
}

export interface LoginAction {
    type: TYPES.LOGIN;
    data: AccountDTO;
}

export interface LogoutAction {
    type: TYPES.LOGOUT;
    data?: LogoutData;
}

export interface SetAuthAction {
    type: TYPES.SET_AUTH;
    data: AccountDTO;
}

export type actions = AuthAction | LoginAction | LogoutAction | SetAuthAction;
