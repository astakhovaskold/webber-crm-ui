import {createStore, combineReducers, Reducer, compose} from 'redux';

import {accountReducer} from './account/reducer';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer: Reducer = combineReducers({
    account: accountReducer,
});

export default (initialState = {}) => {
    return createStore(rootReducer, initialState, composeEnhancers());
};
