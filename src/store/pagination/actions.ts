import {SetPaginationFilterAction, SetPaginationParamsAction, TYPES} from './types';

export const setPaginationParamsAction = (data: SetPaginationParamsAction['data']): SetPaginationParamsAction => ({
    type: TYPES.SET_PAGINATION_PARAMS,
    data,
});

export const setPaginationFilterAction = (data: SetPaginationFilterAction['data']): SetPaginationFilterAction => ({
    type: TYPES.SET_PAGINATION_FILTER,
    data,
});
