// @flow
import type {
  ListsAction,
} from 'trello-types';

import * as types from './actionTypes';


export const fetchListsRequest = (): ListsAction => ({
  type: types.FETCH_LISTS_REQUEST,
});
