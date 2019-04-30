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

import * as S from './styled';

type Props = {
  dispatch: Dispatch,
};

const CardsHeader: StatelessFunctionalComponent<Props> = ({
  dispatch,
}: Props): Node => (
  <S.SearchBar>
    <S.SearchIcon
      label="Search"
      size="medium"
    />
    <S.SearchInput
      placeholder="Search card"
      type="text"
      // value={searchValue}
      // onChange={(ev) => {
      //   dispatch(uiActions.setUiState({
      //     issuesSearch: ev.target.value,
      //   }));
      //   dispatch(issuesActions.refetchIssuesRequest(true));
      // }}
    />
    <S.SearchOptions>
      <span className="pointer">
        <span
          onClick={() => {
            // dispatch(
            //   issuesActions.showIssueFormWindow({
            //     projectId: currentProjectId,
            //   }),
            // );
          }}
        >
          <S.AddIcon
            label="Add"
            size="medium"
          />
        </span>
      </span>
    </S.SearchOptions>
  </S.SearchBar>
);

const connector: Connector<{}, Props> = connect(
  dispatch => ({ dispatch }),
);

export default connector(CardsHeader);
