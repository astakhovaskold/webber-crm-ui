import {CommonDB} from '../../../typings/common';

export enum TYPES {
    REGISTER = 'REGISTER',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    SET_AUTH = 'SET_AUTH',
    AUTH = 'AUTH',
}

export enum ROLE {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface AccountState {
    readonly token?: AccountDTO['accessToken'];
    readonly account?: AccountDTO;
    readonly loggedOut: boolean;
}

export interface JobDTO extends CommonDB {
    name: string;
}

interface UserName {
    first: string;
    last: string;
    middle: string;
}

export interface UserRole {
    role: ROLE;
    role_name: string;
}

export interface UserDTO extends CommonDB {
    name: UserName;
    email: string;
    is_active: boolean;
    role: UserRole;
    job?: JobDTO;
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

export interface PasswordData {
    password: string;
    confirmPassword: string;
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
