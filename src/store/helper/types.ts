/**
 * Created by ASTAKHOV A.A. on 25.03.2022
 */
import {AxiosError} from 'axios';

export interface HelperState {
    resultRequest: Record<string, unknown>;
    requests: Record<string, boolean>;
    errors: Record<string, AxiosError | undefined>;
}

export interface FetchingState {
    uid: QueryConfig['uid'];
    fetching: boolean;
}

export enum TYPES {
    REQUEST_FETCHING = 'REQUEST_FETCHING',
    REQUEST_CANCELLING = 'REQUEST_CANCELLING',

    CHECK_REQUEST = 'CHECK_REQUEST',

    GET_DATA = 'GET_DATA',
    SET_DATA = 'SET_DATA',
    SET_ERROR = 'SET_ERROR',

    CLEAR_CACHE = 'CLEAR_CACHE',
}

export interface ResultRequest {
    uid: QueryConfig['uid'];
    result?: unknown;
}

export interface ErrorRequest {
    uid: QueryConfig['uid'];
    error?: AxiosError;
}

export enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export interface QueryConfig<F = unknown, P = unknown> {
    url: string;
    uid: string;
    storeName?: string;
    method?: METHODS;
    params?: P | null;
    filter?: F | null;
    cache?: boolean;
    delay?: number;
    mutation?: boolean;
}

export interface FetchAction {
    type: TYPES.REQUEST_FETCHING;
    data: FetchingState;
}

export interface CancelAction {
    type: string;
    data: FetchingState;
}

export interface CheckAction {
    type: TYPES.CHECK_REQUEST;
    data: QueryConfig;
}

export interface GetDataAction {
    type: string;
    data: QueryConfig;
}

export interface SetDataAction {
    type: TYPES.SET_DATA;
    data: ResultRequest;
}

export interface ErrorAction {
    type: TYPES.SET_ERROR;
    data: ErrorRequest;
}

export interface ClearCacheAction {
    type: TYPES.CLEAR_CACHE;
    data: string;
}

export type actions = SetDataAction | FetchAction | ErrorAction;
