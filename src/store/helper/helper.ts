/**
 * Created by ASTAKHOV A.A. on 25.03.2022
 */

import {LogoutAction, TYPES as ACCOUNT_TYPES} from '../account/types';
import {RootState} from '../types';

import {
    actions,
    CancelAction,
    CheckAction,
    ClearCacheAction,
    ErrorAction,
    ErrorRequest,
    FetchAction,
    GetDataAction,
    HelperState,
    QueryConfig,
    ResultRequest,
    SetDataAction,
    TYPES,
} from './types';

export const fetching = (uid: QueryConfig['uid'], isFetching = true): FetchAction => ({
    type: TYPES.REQUEST_FETCHING,
    data: {
        uid,
        fetching: isFetching,
    },
});

export const cancelByUID = (uid: QueryConfig['uid']): CancelAction => ({
    type: `${TYPES.REQUEST_CANCELLING}_${uid}`,
    data: {
        uid,
        fetching: false,
    },
});

export const checkRequest = (data: QueryConfig): CheckAction => ({
    type: TYPES.CHECK_REQUEST,
    data,
});

export const getData = (data: QueryConfig): GetDataAction => ({
    type: `${TYPES.GET_DATA}_${data.uid}`,
    data,
});

export const setData = (data: ResultRequest): SetDataAction => ({
    type: TYPES.SET_DATA,
    data,
});

export const setError = (data: ErrorRequest): ErrorAction => ({
    type: TYPES.SET_ERROR,
    data,
});

export const clearCache = (data: string): ClearCacheAction => ({
    type: TYPES.CLEAR_CACHE,
    data,
});

const initState: HelperState = {
    resultRequest: {},
    requests: {},
    errors: {},
};

export const requestState = (state: RootState, uid: QueryConfig['uid']) => {
    return typeof state.requests !== 'undefined' ? state.requests.requests[uid] : false;
};

export const requestData = <T>(state: RootState, uid: QueryConfig['uid']): T => {
    return state.requests.resultRequest[uid] as T;
};

export const helperReducer = (state: HelperState = initState, action: actions | LogoutAction): HelperState => {
    switch (action.type) {
        case TYPES.REQUEST_FETCHING: {
            const {uid, fetching: loading} = action.data;

            return {
                ...state,
                requests: {
                    ...state.requests,
                    [uid]: loading,
                },
            };
        }

        case TYPES.SET_DATA: {
            const {uid, result} = action.data;

            return {
                ...state,
                resultRequest: {
                    ...state.resultRequest,
                    [uid]: result,
                },
                errors: {
                    ...state.errors,
                    [uid]: undefined,
                },
            };
        }

        case TYPES.SET_ERROR: {
            const {uid, error} = action.data;

            return {
                ...state,
                errors: {
                    ...state.errors,
                    [uid]: error,
                },
            };
        }

        case ACCOUNT_TYPES.LOGOUT:
            return initState;

        default:
            return state;
    }
};
