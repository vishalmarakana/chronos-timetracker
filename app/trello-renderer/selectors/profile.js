// @flow
import {
  createSelector,
} from 'reselect';

import type {
  ProfileState,
} from 'types';

import {
  getResourceMap,
  getResourceMappedList,
} from './resources';

export const getUserData =
  ({
    profile,
  }: {
    profile: ProfileState,
  }) =>
    profile.userData;

export const getCurrentProfileBoards = createSelector(
  getResourceMap('boards'),
  boards => Object.keys(boards).map(key => boards[key]),
);

export const getCurrentProfileLists = createSelector(
  getResourceMap('lists'),
  lists => Object.keys(lists).map(key => lists[key]),
);

export const getCurrentProfileCards = createSelector(
  getResourceMap('cards'),
  cards => Object.keys(cards).map(key => cards[key]),
);

export const getCurrentBoards = createSelector(
  [
    getResourceMappedList('boards', 'allBoards'),
  ],
  (
    boards: Array<Board>,
  ) => [
    {
      heading: 'Boards',
      items: boards.map(board => ({ value: board.id, content: board.name, meta: { board } })),
    },
  ],
);

export const getListOptions = createSelector(
  [getResourceMappedList('lists', 'allLists')],
  (lists: Array<List>) => [{
    heading: 'Lists',
    items: lists.map(list => ({
      value: list.id,
      content: list.name,
      meta: {
        list,
      },
    })),
  }],
);

export const getCards = createSelector(
  getResourceMappedList('cards', 'filterCards'),
  cards => cards,
);
