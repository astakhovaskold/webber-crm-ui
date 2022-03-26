import {AccountState} from './account/types';
import {HelperState} from './helper/types';

export interface RootState {
    account: AccountState;
    requests: HelperState;
}
