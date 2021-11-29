import {LogoutAction, TYPES} from './account/types';

enum ACTIONS {
    SET_DATA = 'SET_GLOBAL_DATA',
    SET_INIT_READY = 'SET_INIT_READY',
}

interface ActionGlobalData {
    name: string;
    data?: unknown;
    cache?: boolean;
}

type actionSetGlobal = {type: ACTIONS.SET_DATA; data: ActionGlobalData};

type actionSetInitGlobal = {type: ACTIONS.SET_INIT_READY; data?: never};

type actions = actionSetGlobal | actionSetInitGlobal;

type cacheData = Record<string, unknown>;

export interface GlobalState {
    init: boolean;
    data: cacheData;
}

// ---

export const setGlobalData = (data: ActionGlobalData): actionSetGlobal => ({
    type: ACTIONS.SET_DATA,
    data,
});

export const setInitGlobal = (): actionSetInitGlobal => ({
    type: ACTIONS.SET_INIT_READY,
});

const initState: GlobalState = {
    data: {},
    init: false,
};

export const globalReducer = (state = initState, action: actions | LogoutAction): GlobalState => {
    switch (action.type) {
        case ACTIONS.SET_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.data.name]: action.data.data,
                },
            };

        case ACTIONS.SET_INIT_READY:
            return {
                ...state,
                init: true,
            };

        case TYPES.LOGOUT:
            return {
                ...initState,
                init: state.init,
            };

        default:
            return state;
    }
};
