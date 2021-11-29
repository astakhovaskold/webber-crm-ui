import axios from 'axios';

import {v4 as uuid} from 'uuid';

import {AccountState, TYPES, AccountDTO, actions} from './types';

const _UNIQUE_STATE = uuid();

export function getAccountFromLS(): AccountDTO | undefined {
    const storeName = `${_UNIQUE_STATE}_account`;
    const storedAccount = localStorage.getItem(storeName);
    if (storedAccount) {
        try {
            const account: AccountDTO = JSON.parse(storedAccount);
            axios.defaults.headers.common.Authorization = `Bearer ${account.access_token}`;
            return account;
        } catch (e) {
            localStorage.removeItem(storeName);
        }
    }
    return undefined;
}

const initialState: AccountState = {
    loggedOut: false,
    account: getAccountFromLS(),
};

export const accountReducer = (state: AccountState = initialState, action: actions): AccountState => {
    switch (action.type) {
        case TYPES.LOGIN:
            return {
                ...state,
                account: action.data,
                loggedOut: false,
            };

        case TYPES.LOGOUT:
            return {
                ...state,
                account: undefined,
                loggedOut: true,
            };

        default:
            return state;
    }
};
