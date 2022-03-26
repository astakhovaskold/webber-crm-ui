/**
 * Created by ASTAKHOV A.A. on 25.03.2022
 */
import {SagaIterator} from 'redux-saga';

import {all} from 'redux-saga/effects';

import accountSagas from './account/sagas';

export default function* rootSaga(): SagaIterator {
    yield all([...accountSagas]);
}
