import { all, fork } from 'redux-saga/effects';
import gameSaga from './game';

function* rootSaga() {
  yield all([fork(gameSaga)]);
}

export default rootSaga;
