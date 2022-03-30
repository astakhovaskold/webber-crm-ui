import {PaginationActions, PaginationState, TYPES} from './types';

const initialState: PaginationState = {
    params: {},
    filter: {},
    defaultParams: {
        page: 0,
        size: 25,
    },
};

export const paginationReducer = (state: PaginationState = initialState, action: PaginationActions) => {
    switch (action.type) {
        case TYPES.SET_PAGINATION_PARAMS: {
            const {url, params} = action.data;
            const prevParams = state.params[url];

            return {
                ...state,
                params: {
                    ...state.params,
                    [url]: {
                        ...state.defaultParams,
                        ...prevParams,
                        ...params,
                    },
                },
            };
        }
        case TYPES.SET_PAGINATION_FILTER: {
            const {url, filter} = action.data;
            const prevFilter = state.filter[url];
            const prevParams = state.params[url];

            return {
                ...state,
                filter: {
                    ...state.filter,
                    [url]: {
                        ...prevFilter,
                        ...filter,
                    },
                },
                params: {
                    [url]: {
                        ...state.defaultParams,
                        ...prevParams,
                        page: 0,
                    },
                },
            };
        }
        default:
            return state;
    }
};
