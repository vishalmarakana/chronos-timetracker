// @flow
import React from 'react';
import {
  useDispatch,
  useMappedState,
} from 'redux-react-hook';

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
  } = useMappedState(mapState);
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
