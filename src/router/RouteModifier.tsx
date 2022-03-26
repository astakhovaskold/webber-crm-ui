/**
 * Created by ASTAKHOV A.A. on 26.03.2022
 */
import {FC, Suspense, useEffect, useMemo} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';

import Title from '../components/utils/Title';
import SuspenseLoader from '../components/view/SuspenseLoader';
import {_SYSTEM_NAME} from '../globals';
import useAccount from '../hooks/useAccount';
import useAuth from '../hooks/useAuth';
import useDefaultPath from '../hooks/useDefaultPath';

import {RouteProps} from './types';

const RouteModifier: FC<RouteProps> = ({free, restrictedWithAuth, title, children}): JSX.Element | null => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const defaultPath = useDefaultPath();

    const [params] = useSearchParams();
    const auth = useAuth();
    const {loggedOut} = useAccount();

    const redirectAfter = params.get('redirectAfterLogin') || defaultPath;

    const {redirect, redirectAfterLogin} = useMemo<{redirect?: string; redirectAfterLogin?: string}>(() => {
        if (!free && !auth)
            return {
                redirect: '/login',
                redirectAfterLogin: loggedOut ? undefined : pathname,
            };

        if (auth && free && restrictedWithAuth) {
            return {
                redirect: redirectAfter,
            };
        }

        return {
            redirect: undefined,
            redirectAfterLogin: undefined,
        };
    }, [free, auth, restrictedWithAuth, pathname, redirectAfter, loggedOut]);

    useEffect(() => {
        if (redirect) {
            const queryParams = redirectAfterLogin
                ? new URLSearchParams({
                      redirectAfterLogin,
                  }).toString()
                : '';

            navigate({
                pathname: redirect,
                search: queryParams ? `?${queryParams}` : undefined,
            });
        }
    }, [navigate, redirect, redirectAfterLogin]);

    if (redirect) return null;

    return (
        <>
            <Title value={title ?? _SYSTEM_NAME} />
            <Suspense fallback={<SuspenseLoader />}>{children}</Suspense>
        </>
    );
};

export default RouteModifier;
