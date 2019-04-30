// @flow
import type {
  CardsAction,
} from 'trello-types';

import * as types from './actionTypes';


export const fetchCardsRequest = (): CardsAction => ({
  type: types.FETCH_CARDS_REQUEST,
});
