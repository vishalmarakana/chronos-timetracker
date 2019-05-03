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
  id: string,
  name: string,
  closed: boolean,
  idBoard: string,
  pos: number,
  subscribed: boolean
};

export type ListsResources = {
  [Id]: List,
}
