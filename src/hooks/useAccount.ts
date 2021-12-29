import {shallowEqual, useSelector} from 'react-redux';

import {RootState} from '../store/types';

function useAccount(): RootState['account'] {
    return useSelector<RootState, RootState['account']>(state => state.account, shallowEqual);
}

export default useAccount;
