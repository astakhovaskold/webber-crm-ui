/**
 * Created by VIATKIN A.A. on 23.12.2019
 */

import {shallowEqual, useSelector} from 'react-redux';

import {RootState} from '../store/types';

function useAccount(): RootState['account'] {
    const accountState = useSelector<RootState, RootState['account']>(state => state.account, shallowEqual);

    return accountState;
}

export default useAccount;
