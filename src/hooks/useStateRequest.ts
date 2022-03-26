import {shallowEqual, useSelector} from 'react-redux';

import {requestState} from '../store/helper/helper';
import {RootState} from '../store/types';

const useStateRequest = (...uids: Array<string>): boolean => {
    return useSelector<RootState, boolean>(state => uids.some(value => requestState(state, value)), shallowEqual);
};

export default useStateRequest;
