import React from 'react';
import {
  render as reactRender,
} from 'react-dom';
import {
  Provider,
} from 'react-redux';
import {
  setConfig,
  cold,
} from 'react-hot-loader';
import * as Sentry from '@sentry/electron';

import {
  AppErrorBoundary,
} from 'trello-containers';

import rootSaga from './sagas';
import store from './store';


setConfig({
  pureSFC: true,
  onComponentCreate: type => (
    String(type).indexOf('useState') > 0
      || String(type).indexOf('useEffect') > 0
  ) && cold(type),
});

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableNative: false,
  });
}

window.addEventListener(
  'load',
  () => {
    store.runSaga(rootSaga);
    const rootEl = window.document.getElementById('root');
    const render = Component => (
      reactRender(
        <Provider store={store}>
          <Component />
        </Provider>,
        rootEl,
      )
    );
    render(AppErrorBoundary);
  },
);
