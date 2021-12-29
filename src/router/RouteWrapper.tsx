import {FC, lazy, memo, Suspense, useEffect, useMemo} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';

import SuspenseErrorCatcher from '../components/utils/SuspenseErrorCatcher';
import Title from '../components/utils/Title';
import SuspenseLoader from '../components/view/SuspenseLoader';

import useAccess from '../hooks/useAccess';
import useAccount from '../hooks/useAccount';
import useAuth from '../hooks/useAuth';

import useDefaultPath from '../hooks/useDefaultPath';
import {RESTRICTED_ACCESS} from '../libs/text';

import {RouteWrapperProps} from './types';

const NoAccess = lazy(() => import('../components/errors/NoAccess'));

const RouteWrapper: FC<RouteWrapperProps> = memo(
    ({children, free, restrictedWithAuth, title, roles}): JSX.Element | null => {
        const navigate = useNavigate();
        const {pathname} = useLocation();

        const defaultPath = useDefaultPath();

        const [params] = useSearchParams();
        const auth = useAuth();
        const {loggedOut} = useAccount();
        const access = useAccess(roles);

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

        if (auth && !access) {
            return (
                <SuspenseErrorCatcher>
                    <Title value={RESTRICTED_ACCESS} />
                    <Suspense fallback={<SuspenseLoader />}>
                        <NoAccess />
                    </Suspense>
                </SuspenseErrorCatcher>
            );
        }

        return (
            <SuspenseErrorCatcher>
                <Title value={title} />
                <Suspense fallback={<SuspenseLoader />}>{children}</Suspense>
            </SuspenseErrorCatcher>
        );
    },
);

RouteWrapper.displayName = 'RouteWrapper';

export default RouteWrapper;
