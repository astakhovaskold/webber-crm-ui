import {useMemo} from 'react';

import {ROLE} from '../store/account/types';

import useAccount from './useAccount';

function useDefaultPath(): string {
    const {account} = useAccount();

    const path = useMemo(() => {
        if (!account) return '/';

        switch (account.user.role) {
            case ROLE.ADMIN:
            case ROLE.SECURITY_ADMIN:
                return '/admin';

            default:
                return '/monitoring';
        }
    }, [account]);

    return path;
}

export default useDefaultPath;
