// @flow
import React from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';

import {
  hot,
} from 'react-hot-loader/root';

import type {
  Dispatch,
} from 'trello-types';

import * as actions from 'trello-actions';
import * as selectors from 'trello-selectors';
import {
  TestComponent,
  AuthForm,
} from 'trello-components';

type Props = {
  initializeInProcess: boolean,
  isAuthorized: boolean,
  trelloApiKey: string,
};

const mapState: Props = state => ({
  ...selectors.getUiState([
    'initializeInProcess',
    'isAuthorized',
  ])(state),
});

const AppContainer = () => {
  const {
    initializeInProcess,
    isAuthorized,
  } = useSelector(mapState);
  const dispatch: Dispatch = useDispatch();

  return (
    <div>
      {
        initializeInProcess
          ? (
            <div>
              Initialize...
            </div>
          )
          : (
            isAuthorized
              ? (
                <div>
                  <TestComponent />
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(actions.clearAppCacheRequest());
                    }}
                  >
                    Clear cache
                  </button>
                  <webview
                    src="https://trello.com/b/jQoLS8B6/new-web-app-front-end"
                    autosize="on"
                    style={{
                      display: 'inline-flex',
                      width: '800px',
                      height: '680px',
                    }}
                  />
                </div>
              ) : (
                <AuthForm />
              )
          )
      }
    </div>
  );
};

export default hot(AppContainer);
