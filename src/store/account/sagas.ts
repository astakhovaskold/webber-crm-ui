/**
 * Created by VIATKIN A.A. on 23.12.2019
 */

import axios, {AxiosResponse} from 'axios';
import {SagaIterator} from 'redux-saga';
import {call, Effect, put, putResolve, takeEvery, takeLeading} from 'redux-saga/effects';

import {_STORAGE_NAME, _STORAGE_TOKEN} from '../../globals';
import $api from '../../http';
import API from '../../libs/API';

import {fetching} from '../helper/helper';

import {login} from './actions';
import {AccountDTO, AuthAction, LoginAction, LogoutAction, RegisterAction, SetAuthAction, TYPES} from './types';

function* setAuthData(account: AccountDTO) {
    yield putResolve(login(account));
}

function* requestLogin(action: AuthAction): SagaIterator {
    const {data} = action;

    try {
        yield put(fetching(TYPES.AUTH));
        const {data: account}: AxiosResponse<AccountDTO> = yield call($api.post, API.auth('login'), data);
        yield* setAuthData(account);
    } catch (e) {
        //
    } finally {
        yield put(fetching(TYPES.AUTH, false));
    }
}

function* requestRegister(action: RegisterAction): SagaIterator {
    const {data} = action;

    try {
        yield put(fetching(TYPES.REGISTER));
        const {data: account}: AxiosResponse<AccountDTO> = yield call($api.post, API.auth('registration'), data);
        yield* setAuthData(account);
    } catch (e) {
        //
    } finally {
        yield put(fetching(TYPES.REGISTER, false));
    }
}

function* updateStorage(action: LoginAction | LogoutAction): SagaIterator {
    switch (action.type) {
        case TYPES.LOGIN:
            localStorage.setItem(_STORAGE_TOKEN, action.data.accessToken);
            localStorage.setItem(_STORAGE_NAME, JSON.stringify(action.data));
            break;

        case TYPES.LOGOUT:
            localStorage.removeItem(_STORAGE_TOKEN);
            localStorage.removeItem(_STORAGE_NAME);
            break;
    }
}

function* requestLogout({data}: LogoutAction): SagaIterator {
    const quiet = data?.quiet ?? false;
    try {
        if (!quiet) {
            yield call($api.post, API.auth('logout'), {});
        }
    } catch (e) {
        // noop
    } finally {
        delete axios.defaults.headers.common.Authorization;
    }
}

const accountSagas: Array<Effect> = [
    takeLeading(TYPES.AUTH, requestLogin),
    takeLeading(TYPES.REGISTER, requestRegister),
    takeEvery([TYPES.REGISTER, TYPES.LOGIN, TYPES.LOGOUT], updateStorage),
    takeLeading(TYPES.LOGOUT, requestLogout),
    takeEvery(TYPES.SET_AUTH, function* ({data}: SetAuthAction) {
        yield setAuthData(data);
    }),
];

export default accountSagas;
