import * as eff from 'redux-saga/effects';

import * as actions from 'trello-actions';
import {
  trelloApi,
} from 'trello-api';

import createActionCreators from 'redux-resource-action-creators';

import {
  throwError,
} from './helpers';

function* fetchBoards() {
  try {
    const resourceActions = createActionCreators('read', {
      resourceType: 'boards',
      request: 'allBoards',
      list: 'allBoards',
    });
    yield eff.put(resourceActions.pending());
    let boards = [];
    const response = yield eff.call(
      trelloApi.getAllBoards,
      {
        params: {
          boards: 'all',
        },
      },
    );
    boards = response.boards;
    yield eff.put(resourceActions.succeeded({
      resources: boards,
    }));
  } catch (err) {
    yield eff.call(throwError, err);
  }
}


export function* watchFetchBoardsRequest(): Generator<*, *, *> {
  yield eff.takeEvery(actions.actionTypes.FETCH_BOARDS_REQUEST, fetchBoards);
}
