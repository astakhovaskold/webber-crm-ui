import {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {setPaginationFilterAction} from '../../store/pagination/actions';
import {PaginationFilter} from '../../store/pagination/types';
import {RootState} from '../../store/types';

type setFilterFn<T> = (filter: T) => void;

function useFilterPagination<T extends PaginationFilter>(url: string): [Partial<T>, setFilterFn<Partial<T>>] {
    const dispatch = useDispatch();

    const filterPagination = useSelector(
        (state: RootState) => (state.pagination.filter[url] as Partial<T>) ?? {},
        shallowEqual,
    );

    const setFilter = useCallback<setFilterFn<Partial<T>>>(
        filter => {
            dispatch(setPaginationFilterAction({url, filter}));
        },
        [dispatch, url],
    );

    return [filterPagination, setFilter];
}

export default useFilterPagination;
