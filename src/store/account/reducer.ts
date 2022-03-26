import axios from 'axios';

import {AccountState, TYPES, AccountDTO, actions} from './types';

export function getAccountFromLS(): AccountDTO | undefined {
    const storeName = `account`;
    const storedAccount = localStorage.getItem(storeName);
    if (storedAccount) {
        try {
            const account: AccountDTO = JSON.parse(storedAccount);
            axios.defaults.headers.common.Authorization = `Bearer ${account.accessToken}`;
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
