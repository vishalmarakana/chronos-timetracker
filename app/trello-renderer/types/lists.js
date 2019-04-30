// @flow
import * as actionTypes from '../actions/actionTypes/lists';
import type {
  Id,
} from '.';


export type ListsAction =
  {|
    type: typeof actionTypes.FETCH_LISTS_REQUEST,
  |};

export type List = {
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

export type ListsResources = {
  [Id]: List,
}
