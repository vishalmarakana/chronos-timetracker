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
} from 'trello-selectors';
import {
  actionTypes,
} from 'trello-actions';

import {
  throwError,
} from './ui';

export function* fetchCards(): Generator<*, *, *> {
  const resourcesActions = createActionCreators('read', {
    resourceType: 'cards',
    request: 'filterCards',
    list: 'filterCards',
  });


  try {
    yield eff.put(resourcesActions.pending());
    const boardId: Id = yield eff.select(getUiState('selectedBoardId'));
    const board = yield eff.select(getResourceItemById('boards', boardId));

    const listId: Id = yield eff.select(getUiState('selectedListId'));
    const list = yield eff.select(getResourceItemById('lists', listId));
    if (
      listId
      && list
    ) {
      const response = yield eff.call(
        trelloApi.getListCards,
        {
          params: {
            listId,
          },
        },
      );
      console.log('listCardsResponse', response);
      yield eff.put(resourcesActions.succeeded({
        resources: response,
      }));
    } else if (
      boardId
      && board
    ) {
      const response = yield eff.call(
        trelloApi.getBoardCards,
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

export function* watchFetchCardsRequest(): Generator<*, *, *> {
  yield eff.takeEvery(actionTypes.FETCH_CARDS_REQUEST, fetchCards);
}
