import * as eff from 'redux-saga/effects';

import {
  initializeApp,
  takeInitialConfigureApp,
  takeClearAppCache,
  handleQuitRequest,
} from './initialize';
import {
  authFlow,
} from './auth';


export default function* rootSaga() {
  yield eff.all([
    eff.fork(handleQuitRequest),
    eff.fork(takeInitialConfigureApp),
    eff.fork(takeClearAppCache),
    eff.fork(authFlow),
    eff.fork(initializeApp),
  ]);
}
