// @flow
import type {
  CardsAction,
} from 'trello-types';

import * as types from './actionTypes';


export const fetchCardsRequest = (): CardsAction => ({
  type: types.FETCH_CARDS_REQUEST,
});

export const setCurrentCardId = ({
  currentCardId
}): CardsAction => ({
  type: types.SET_CURRENT_CARD_ID,
  payload: {
    currentCardId,
  },
  scope: 'allRenderer',
});