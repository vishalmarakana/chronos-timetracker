// @flow
import * as actionTypes from '../actions/actionTypes/cards';
import type {
  Id,
} from '.';


export type CardsAction =
  {|
    type: typeof actionTypes.FETCH_CARDS_REQUEST,
  |};

export type Card = {
  // id: number,
  // self: string,
  // state: string,
  // name: string,
  // startDate: string,
  // endDate: string,
  // completeDate: string,
  // originBoardId: number,
  // goal: string,
};

export type CardsResources = {
  [Id]: Card,
}
