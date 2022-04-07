import {useMemo} from 'react';

import {ROLE} from '../store/account/types';

import useAccount from './useAccount';

function useDefaultPath(): string {
    const {account} = useAccount();

    const path = useMemo(() => {
        if (!account) return '/';

        switch (account.user.role.role) {
            case ROLE.ADMIN:
                return '/';

            default:
                return '/tasks';
        }
    }, [account]);

    return path;
}

export default useDefaultPath;
