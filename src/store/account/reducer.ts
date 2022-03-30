import {_STORAGE_NAME} from '../../globals';

import {AccountState, TYPES, AccountDTO, actions} from './types';

export function getAccountFromLS(): AccountDTO | undefined {
    const storedAccount = localStorage.getItem(_STORAGE_NAME);

    if (storedAccount) {
        try {
            const account: AccountDTO = JSON.parse(storedAccount);
            return account;
        } catch (e) {
            localStorage.removeItem(_STORAGE_NAME);
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
