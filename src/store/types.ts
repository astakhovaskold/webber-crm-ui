import {AccountState} from './account/types';
import {HelperState} from './helper/types';
import {PaginationState} from './pagination/types';

export interface RootState {
    account: AccountState;
    requests: HelperState;
    pagination: PaginationState;
}
