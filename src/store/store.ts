import {createStore, combineReducers, Reducer, compose, applyMiddleware} from 'redux';

import createSagaMiddleware, {SagaMiddleware} from 'redux-saga';

import {logApp, logError} from '../libs/log';

import {accountReducer} from './account/reducer';
import {paginationReducer} from './pagination/reducer';
import rootSaga from './rootSaga';

let t = 0;

const sagaMiddleware: SagaMiddleware = createSagaMiddleware({
    onError(error) {
        clearTimeout(t);

        t = window.setTimeout(() => {
            // errorInfo - stack of saga
            logError('SAGA:%o', error);
            logApp('RESTARTING SAGA');
            sagaMiddleware.run(rootSaga);
        }, 1000);
    },
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer: Reducer = combineReducers({
    account: accountReducer,
    pagination: paginationReducer,
});

export default (initialState = {}) => {
    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(rootSaga);

    return store;
};
