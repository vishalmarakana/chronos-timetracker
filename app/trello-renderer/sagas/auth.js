import * as eff from 'redux-saga/effects';
import {
  remote,
} from 'electron';

import * as actions from 'trello-actions';
import * as selectors from 'trello-selectors';

import {
  throwError,
} from './helpers';

const keytar = remote.require('keytar');

function setCookie(cookie) {
  return new Promise((
    (resolve, reject) => {
      remote.session.defaultSession.cookies.set(
        cookie,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(cookie);
          }
        },
      );
    }
  ));
}

export function* authFlow(): Generator<*, *, *> {
  while (true) {
    try {
      const { token } = yield eff.take(actions.actionTypes.AUTH_REQUEST);
      yield eff.put(actions.setUiState({
        authRequestInProcess: true,
      }));
      try {
        const authWebContentsId = yield eff.select(
          selectors.getUiState('authWebContentsId'),
        );
        const authWebContents = remote.webContents.fromId(authWebContentsId);
        const cookies = yield eff.cps(
          authWebContents.session.cookies.get,
          {},
        );
        yield eff.call(
          keytar.setPassword,
          'ChronosTrello',
          'cookies',
          JSON.stringify(cookies),
        );
        yield eff.all(
          cookies.map(cookie => (
            eff.call(
              setCookie,
              cookie,
            )
          )),
        );
      } catch (err) {
        console.log(err);
      }

      yield eff.put(
        actions.initialConfigureApp(
          {
            token,
            saveCredentials: true,
          },
        ),
      );
    } catch (err) {
      yield eff.put(actions.setUiState({
        authRequestInProcess: false,
        isAuthorized: false,
      }));
      yield eff.call(throwError, err);
    }
  }
}
