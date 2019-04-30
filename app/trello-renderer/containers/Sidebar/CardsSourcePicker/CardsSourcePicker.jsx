// @flow
import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  getStatus as getResourceStatus,
} from 'redux-resource';

import type {
  StatelessFunctionalComponent,
  Node,
} from 'react';
import type {
  Connector,
} from 'react-redux';
import type {
  Dispatch,
  SelectedOption,
} from 'types';

import {
  SingleSelect,
} from 'components';

import * as selectors from 'trello-selectors';
import * as actions from 'trello-actions';

import * as S from './styled';

type Props = {
  // selectedBoardId: string,
  // selectedListId: string,
  // boards: Array,
  // listsOptions,
  dispatch: Dispatch,
};
const CardsSourcePicker: StatelessFunctionalComponent<Props> = ({
  selectedBoardId,
  selectedListId,
  boards,
  listsOptions,
  dispatch,
}: Props): Node => (
  <S.CardsSource>
    <S.Filters>
      <SingleSelect
        items={boards}
        hasAutocomplete
        placeholder="Select board"
        onSelected={({ item }) => {
          dispatch(actions.setUiState({
            selectedBoardId: item.value,
          }));
          dispatch(actions.clearResourceList({
            resourceType: 'cards',
            list: 'filterCards',
          }));
          dispatch(actions.fetchListsRequest());
          dispatch(actions.fetchCardsRequest());
        }}
        loadingMessage="Fetching boards..."
        shouldFitContainer
        noMatchesFound="Nothing found"
      />
      {selectedBoardId && (
        <SingleSelect
          items={listsOptions}
          hasAutocomplete
          placeholder="Select list"
          onSelected={({ item }) => {
            dispatch(actions.setUiState({
              selectedListId: item.value,
            }));
            dispatch(actions.clearResourceList({
              resourceType: 'cards',
              list: 'filterCards',
            }));
            dispatch(actions.fetchCardsRequest());
          }}
          loadingMessage="Fetching lists..."
          shouldFitContainer
          noMatchesFound="Nothing found"
        />
      )}
    </S.Filters>
  </S.CardsSource>
);

function mapStateToProps(state) {
  return {
    selectedBoardId: selectors.getUiState('selectedBoardId')(state),
    selectedListId: selectors.getUiState('selectedListId')(state),
    boards: selectors.getCurrentBoards(state),
    listsOptions: selectors.getListOptions(state),
  };
}

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  dispatch => ({ dispatch }),
);

export default connector(CardsSourcePicker);
