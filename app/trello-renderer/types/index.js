// @flow
import type {
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
} from 'redux';

import type {
  UiAction,
  UiState,
} from './ui';

import type {
  Card,
  CardsAction,
  CardsResources,
} from './cards';

import type {
  Board
  BoardsAction,
  BoardsResources,
} from './boards';

import type {
  List
  ListsAction,
  ListsResources,
} from './boards';

export * from './ui';

export type Action =
  UiAction;

export type State = {|
  ui: UiState,
|}



export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;

export type Id = string | number;
