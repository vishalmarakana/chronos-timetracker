import * as eff from 'redux-saga/effects';

import {
  initializeApp,
  takeInitialConfigureApp,
  takeClearAppCache,
  handleQuitRequest,
} from './initialize';

import {
  watchFetchBoardsRequest,
} from './boards';

import {
  watchFetchListsRequest,
} from './lists';

import {
  watchFetchCardsRequest,
} from './cards';

import {
  authFlow,
} from './auth';


export default function* rootSaga() {
  yield eff.all([
    // initialize
    eff.fork(handleQuitRequest),
    eff.fork(takeInitialConfigureApp),
    eff.fork(initializeApp),

    // auth
    eff.fork(authFlow),

    // settings
    eff.fork(takeClearAppCache),

    // boards
    eff.fork(watchFetchBoardsRequest),

    // cards
    eff.fork(watchFetchCardsRequest),
    // eff.fork(cardsSagas.watchReFetchIssuesRequest),
    // lists
    eff.fork(watchFetchListsRequest),
  ]);
}
