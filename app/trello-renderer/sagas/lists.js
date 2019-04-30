// @flow
import * as eff from 'redux-saga/effects';
import createActionCreators from 'redux-resource-action-creators';

import type {
  Id,
} from 'trello-types';

import {
  trelloApi,
} from 'trello-api';
import {
  getUiState,
  getResourceItemById,
  getResourceIds,
} from 'trello-selectors';
import {
  actionTypes,
} from 'trello-actions';

import * as actions from 'trello-actions';

import {
  throwError,
} from './ui';


export function* fetchLists(): Generator<*, *, *> {
  const resourcesActions = createActionCreators('read', {
    resourceType: 'lists',
    request: 'allLists',
    list: 'allLists',
  });
  try {
    yield eff.put(resourcesActions.pending());
    const boardId: Id = yield eff.select(getUiState('selectedBoardId'));
    const board = yield eff.select(getResourceItemById('boards', boardId));
    if (
      boardId
      && board
    ) {
      const listIds = yield eff.select(getResourceIds('lists', 'allLists'));
      if (listIds.length > 0) {
        yield eff.put(actions.clearResourceList({
          resourceType: 'lists',
          list: 'allLists',
        }));
      }
      const response = yield eff.call(
        trelloApi.getBoardLists,
        {
          params: {
            boardId,
          },
        },
      );
      yield eff.put(resourcesActions.succeeded({
        resources: response,
      }));
    } else {
      yield eff.put(resourcesActions.succeeded({
        resources: [],
      }));
    }
  } catch (err) {
    yield eff.put(resourcesActions.succeeded({
      resources: [],
    }));
    yield eff.call(throwError, err);
  }
}

export function* watchFetchListsRequest(): Generator<*, *, *> {
  yield eff.takeEvery(actionTypes.FETCH_LISTS_REQUEST, fetchLists);
}
