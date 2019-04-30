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
import Tag from '@atlaskit/tag';
import type {
  User,
  Dispatch,
} from 'trello-types';

import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@atlaskit/dropdown-menu';

import * as actions from 'trello-actions';
import {
  getUserData,
  getUiState,
} from 'trello-selectors';
import {
  cogIcon,
  refreshWhite,
} from 'utils/data/svg';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import EditorAddIcon from '@atlaskit/icon/glyph/editor/add';

import * as S from './styled';


type Props = {
  userData: User,
  accounts: Array<{|
    name: string,
    hostname: string,
  |}>,
  dispatch: Dispatch,
};

const Header: StatelessFunctionalComponent<Props> = ({
  userData,
  accounts,
  dispatch,
}: Props): Node => (
  <S.Header className="webkit-drag">
    <S.Profile>
      <S.ProfilePicture
        src={`${userData.avatarUrl}/50.png`}
        alt="User avatar"
      />
      <S.ProfileInfo>
        <S.ProfileName>
          {userData.fullName}
        </S.ProfileName>
        <DropdownMenu
          triggerType="default"
          position="right top"
          trigger={(
            <S.ProfileTeam>
              {userData.username}
              <ChevronDownIcon />
            </S.ProfileTeam>
          )}
        >
          {accounts.map((ac) => {
            return (
              <DropdownItem
                key={`${ac.hostname}:${ac.name}`}
              >
                <Tag text={ac.hostname} color="teal" />
                {ac.name}
              </DropdownItem>
            );
          })}
          <DropdownItem
            key="addAccount"
            // onClick={() => dispatch(authActions.logoutRequest({ forget: false }))}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <EditorAddIcon /> Add account
            </span>
          </DropdownItem>
        </DropdownMenu>
      </S.ProfileInfo>
    </S.Profile>

    <S.Icons>
      <S.RefreshIcon
        src={refreshWhite}
        alt="Refresh"
      />
      <DropdownMenu
        triggerType="default"
        position="bottom right"
        trigger={(
          <S.SettingsIcon
            src={cogIcon}
            alt="Settings"
          />
        )}
      >
        <DropdownItemGroup>
          <DropdownItem
          >
            Settings
          </DropdownItem>
          <DropdownItem
          >
            Support and feedback
          </DropdownItem>
          <DropdownItem
          >
            Github
          </DropdownItem>
          <S.DropdownSeparator />
          <S.DropdownLogoutItem
            onClick={() => {
              // dispatch(authActions.logoutRequest({
              //   forget: true,
              // }));
            }}
          >
            Logout
          </S.DropdownLogoutItem>
        </DropdownItemGroup>
      </DropdownMenu>
    </S.Icons>
  </S.Header>
);


function mapStateToProps(state) {
  return {
    userData: getUserData(state),
    accounts: getUiState('accounts')(state),
  };
}

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  dispatch => ({ dispatch }),
);

export default connector(Header);
