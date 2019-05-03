// @flow
import React, {
  useEffect,
} from 'react';
import {
  ThemeProvider,
} from 'styled-components';

import type {
  StatelessFunctionalComponent,
  Node,
} from 'react';

import {
  getPreload,
} from 'trello-utils';

import Header from '../Header';
import Sidebar from '../Sidebar';
import * as S from './styled';

const theme = {
  primary: '#0079BF',
};

type Props = {};

const Main: StatelessFunctionalComponent<Props> = (): Node => {
  useEffect(() => {
    // if (config.loginTrelloWindowDevTools) {
    const webview = document.querySelector('#trello-webview');
    webview.addEventListener('dom-ready', () => {
      webview.openDevTools();
    });
    // }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <S.Main>
        <S.Left>
          <Header />
          <Sidebar />
        </S.Left>
        <webview
          id="trello-webview"
          src="https://trello.com/b/jQoLS8B6/new-web-app-front-end"
          autosize="on"
          preload={`file:${getPreload('trelloCardPreload')}`}
          style={{
            display: 'inline-flex',
            width: '800px',
            height: '680px',
          }}
        />
      </S.Main>
    </ThemeProvider>
  );
};

export default Main;
