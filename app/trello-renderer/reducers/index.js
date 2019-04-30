// @flow
import {
  combineReducers,
} from 'redux';

import {
  resourceReducer,
} from 'redux-resource';

import {
  windowsManager,
} from 'shared/reducers';

import ui from './ui';
import profile from './profile';

import clearAllPlugin from './resourcesPlugins/clearAllPlugin';
import clearListPlugin from './resourcesPlugins/clearListPlugin';

const rootReducer = combineReducers({
  ui,
  profile,
  windowsManager,
  boards: resourceReducer('boards', {
    plugins: [
      clearAllPlugin,
    ],
    initialState: {
      lists: {
        allBoards: [],
      },
    },
  }),
  lists: resourceReducer('lists', {
    plugins: [
      clearAllPlugin,
      clearListPlugin,
    ],
    initialState: {
      lists: {
        allLists: [],
      },
    },
  }),
  cards: resourceReducer('cards', {
    plugins: [
      clearAllPlugin,
      clearListPlugin,
    ],
    initialState: {
      lists: {
        filterCards: [],
      },
    },
  }),
});

export default rootReducer;
