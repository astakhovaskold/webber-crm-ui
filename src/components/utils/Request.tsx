import {FC, forwardRef, memo, ReactNode, Ref, useEffect, useImperativeHandle, useMemo} from 'react';

import {QueryKey, useQuery, useQueryClient} from 'react-query';

import $api from '../../http';
import API from '../../libs/API';

export interface RequestInstance {
    run: () => void;
}

interface RequestProps<F = Record<string, unknown>, P = Record<string, unknown>> {
    url: string;
    queryKey: QueryKey;
    params?: P;
    filter?: F;
    clearOnUnmount?: boolean;
    cache?: boolean;

    ref?: Ref<RequestInstance>;

    render?(response?: unknown, loading?: boolean): ReactNode;
}

const Request: FC<RequestProps> = memo(
    forwardRef(({render, queryKey, url, params, filter, clearOnUnmount, cache}, ref): JSX.Element => {
        const queryClient = useQueryClient();

        const query = useMemo(
            () => ({
                ...params,
                ...filter,
            }),
            [filter, params],
        );

        const {data, refetch, isLoading} = useQuery<unknown>(queryKey, ({signal}) =>
            $api.get(url, {params: query, signal}).then(res => res.data),
        );

        useImperativeHandle(
            ref,
            () => ({
                run(): void {
                    refetch();
                },
            }),
            [refetch],
        );

        useEffect(() => {
            if (clearOnUnmount) {
                return () => {
                    if (cache) queryClient.removeQueries(queryKey);
                };
            }
        }, [cache, clearOnUnmount, queryClient, queryKey]);

        return <>{typeof render === 'function' ? render(data, isLoading) : null}</>;
    }),
);

Request.displayName = 'Request';

Request.defaultProps = {
    url: API.app,
    filter: {},
    params: {},
    clearOnUnmount: false,
    cache: false,
};

export default Request;
