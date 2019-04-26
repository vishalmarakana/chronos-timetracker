// @flow
import * as eff from 'redux-saga/effects';
import rimraf from 'rimraf';
import {
  remote,
} from 'electron';
import storage from 'electron-json-storage';
import path from 'path';

import * as actions from 'trello-actions';

import {
  getUiState,
} from 'trello-selectors';
import {
  persistInitialState as persistInitialUiState,
} from '../reducers/ui';


export function* throwError(err: any): Generator<*, void, *> {
  yield eff.call(console.error, err);
}

export const setElectronStorage = (
  key,
  data,
) => (
  new Promise((resolve, reject) => {
    storage.set(key, data, (err) => {
      if (err) {
        reject(new Error(`Error setting to storage: ${err}`));
      }
      resolve();
    });
  })
);

export const removeElectronStorage = key => (
  new Promise((resolve, reject) => {
    storage.remove(key, (err) => {
      if (err) {
        reject(new Error(`Error removing from storage: ${err}`));
      }
      resolve();
    });
  })
);

export const clearElectronStorage = () => (
  new Promise((resolve, reject) => {
    storage.clear((err) => {
      if (err) {
        reject(new Error('Error clear storage'));
      }
      resolve();
    });
  })
);

export const getElectronStorage = (key, defaultValue) => (
  new Promise((resolve, reject) => {
    storage.get(key, (err, data) => {
      if (err) {
        reject(new Error(`Error getting from storage: ${err}`));
      }
      if (
        !data
        || (
          typeof data === 'object'
          && Object.keys(data).length === 0
        )
      ) {
        resolve(
          defaultValue || null,
        );
      } else {
        resolve(data);
      }
      resolve();
    });
  })
);

export function* savePersistStorage() {
  const persistUiState = yield eff.select(
    getUiState(Object.keys(persistInitialUiState)),
  );
  const trelloUserId = yield eff.select(
    getUiState('trelloUserId'),
  );
  yield eff.call(
    setElectronStorage,
    `persistUiState_trello_${trelloUserId}`,
    persistUiState,
  );

  const accounts = yield eff.select(
    getUiState('accounts'),
  );
  yield eff.call(
    setElectronStorage,
    'accounts',
    accounts,
  );
}

export function* clearAppCache() {
  const clearAppDataMessage = [
    'By clicking proceed you will be removing all added accounts and preferences from Chronos.',
    'When the application restarts, it will be as if you are starting Chronos for the first time.',
  ].join(' ');
  const appPath = (
    path.join(
      remote.app.getPath('appData'),
      remote.app.getName(),
    )
  );
  const response = yield eff.call(
    remote.dialog.showMessageBox,
    {
      type: 'warning',
      buttons: ['YES', 'NO'],
      defaultId: 0,
      message: 'Are you sure',
      detail: clearAppDataMessage,
    },
  );
  if (response === 0) {
    yield eff.put(actions.setUiState({
      readyToQuit: true,
    }));
    if (process.env.NODE_ENV === 'development') {
      yield eff.call(clearElectronStorage);
      yield eff.call(
        remote.session.defaultSession.clearCache,
        () => {},
      );
      yield eff.call(remote.session.defaultSession.clearStorageData);
      window.location.reload();
    } else {
      yield eff.cps(
        rimraf,
        appPath,
      );
      remote.app.relaunch();
      remote.app.exit(0);
    }
  }
}

export function* notify(): Generator<*, void, *> {
  yield eff.call(console.log, 'notify');
}
