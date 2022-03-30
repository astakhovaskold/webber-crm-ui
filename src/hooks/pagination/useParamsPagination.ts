import {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {setPaginationParamsAction} from '../../store/pagination/actions';
import {PaginationParams} from '../../store/pagination/types';
import {RootState} from '../../store/types';

type setParamsFn = (params: Partial<PaginationParams>) => void;

function useParamsPagination(url: string): [PaginationParams, setParamsFn] {
    const dispatch = useDispatch();

    const paramsPagination = useSelector(
        (state: RootState) => state.pagination.params[url] ?? state.pagination.defaultParams,
        shallowEqual,
    );

    const setParams = useCallback<setParamsFn>(
        params => {
            dispatch(setPaginationParamsAction({url, params}));
        },
        [dispatch, url],
    );

    return [paramsPagination, setParams];
}

export default useParamsPagination;
