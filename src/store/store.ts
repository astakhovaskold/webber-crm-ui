import {createStore, combineReducers, Reducer} from 'redux';

import {accountReducer} from './account/reducer';

const rootReducer: Reducer = combineReducers({
    account: accountReducer,
});

export default (initialState = {}) => {
    const store = createStore(rootReducer, initialState);
    return store;
};
