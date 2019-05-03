// @flow
import React from 'react';
import {
  connect,
} from 'react-redux';

import type {
  StatelessFunctionalComponent,
  Node,
} from 'react';
import type {
  Connector,
} from 'react-redux';
import type {
  Dispatch,
} from 'trello-types';

import * as actions from 'trello-actions';
import {
  RecentItemsPlaceholder,
} from 'trello-components';
import {
  getUiState,
} from 'trello-selectors';

import CardsSourcePicker from './CardsSourcePicker';
import SidebarCards from './SidebarCards';

import * as S from './styled';


type Props = {
  sidebarType: string,
  dispatch: Dispatch,
};

const Sidebar: StatelessFunctionalComponent<Props> = ({
  sidebarType,
  dispatch,
}: Props): Node => (
  <S.Sidebar>
    <CardsSourcePicker />
    <S.Tab>
      <S.TabDesc
        active={sidebarType === 'recent'}
        onClick={() => {
          dispatch(actions.setUiState({
            sidebarType: 'recent',
          }));
        }}
      >
        Recent worklogs
      </S.TabDesc>
      <S.TabDesc
        active={sidebarType === 'all'}
        onClick={() => {
          dispatch(
            actions.setUiState({
              sidebarType: 'all',
            }),
          );
        }}
      >
        Boards
      </S.TabDesc>
    </S.Tab>
    <S.List
      sidebarType={sidebarType}
    >
      <RecentItemsPlaceholder />
      <SidebarCards />
    </S.List>
  </S.Sidebar>
);

function mapStateToProps(state) {
  return {
    sidebarType: getUiState('sidebarType')(state),
  };
}

const connector : Connector<{}, Props> = connect(
  mapStateToProps,
  dispatch => ({ dispatch }),
);

export default connector(Sidebar);
