import {useMemo} from 'react';

import Utils from '../libs/Utils';

import {ROLE} from '../store/account/types';

import useAccount from './useAccount';

function useAccess(roles: Array<ROLE> = []): boolean {
    const {account} = useAccount();
    const hasAccess = useMemo<boolean>(() => {
        return Utils.hasAccess(account, roles);
    }, [account, roles]);

    return hasAccess;
}

export default useAccess;
