// @flow
import type {
  UiAction,
} from '../types';

import {
  actionTypes,
} from '.';


export const setUiState = (
  keyOrRootValues: any,
  maybeValues: any,
): UiAction => ({
  type: actionTypes.SET_UI_STATE,
  payload: {
    keyOrRootValues,
    maybeValues,
  },
});

export const initialConfigureApp = ({
  token,
  saveCredentials,
}) => ({
  type: actionTypes.INITIAL_CONFIGURE_APP,
  token,
  saveCredentials,
});

export const clearAppCacheRequest = () => ({
  type: actionTypes.CLEAR_APP_CACHE_REQUEST,
});
