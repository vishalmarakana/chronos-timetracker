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
  Id,
  Dispatch,
  // Card,
} from 'types';

import {
  notificationIcon,
  attachmentsIcon,
  duedateIcon,
  commentsIcon,
  descriptionIcon,
  checkIcon,
  checkboxIcon,
  subscribeIcon,
  voteIcon,
} from 'trello-assets'

import * as selectors from 'trello-selectors';
import {
  IssueItemPlaceholder,
  ErrorBoundary,
} from 'components';

import * as S from './styled';

import CardsHeader from './CardsHeader';

type Props = {
  // cards: Array<Card>,
  dispatch: Dispatch,
};

const SidebarAllItems: StatelessFunctionalComponent<Props> = ({
  cards,
  dispatch,
}: Props): Node => (
  <S.ListContainer>
    <CardsHeader />
    <S.CardsWrapper>
      {cards && cards.length > 0 && cards.map(card => (
        <S.Card
          key={card.id}
        >
          <S.CardLabelsWrapper>
            {card?.labels?.map(({
              id,
              name,
              color
            }) => (
              <S.CardLabel
                key={id}
                isTextVisible
                labelColor={color}
              >
                {name}
              </S.CardLabel>
            ))}
          </S.CardLabelsWrapper>
          <S.CardName>
            {card.name}
          </S.CardName>
          <S.CardBadgesWrapper>
            {card?.badges && Object.keys(card.badges).map(key => ({
              // checkItems: (
              //   <S.CheckItemsBadge>
              //     {card.badges.checkItemsChecked > 0 ? (
              //       <S.BadgeIcon
              //         src={checkIcon}
              //         alt="checkedIcon"
              //       />
              //       `${card.badges.checkItemsChecked}/${key}`
              //     ) : (
              //       <S.BadgeIcon
              //         src={checkboxIcon}
              //         alt="checkboxIcon"
              //       />
              //       `${key}`
              //     )}
              //   </S.CheckItemsBadge>
              // ),
              subscribed: (
                <S.SubscriptionBadge>
                  <S.BadgeIcon
                    src={subscribeIcon}
                    alt="subscribeIcon"
                  />
                </S.SubscriptionBadge>
              ),
              comments: (
                <S.CommentsBadge>
                  <S.BadgeIcon
                    src={commentsIcon}
                    alt="commentsIcon"
                  />
                  {card.badges[key]}
                </S.CommentsBadge>
              ),
              votes: (
                <S.VotesBadge>
                  <S.BadgeIcon
                    src={voteIcon}
                    alt="voteIcon"
                  />
                  {card.badges[key]}
                </S.VotesBadge>
              ),
            }[key]
            ))}
          </S.CardBadgesWrapper>
        </S.Card>
      ))}
    </S.CardsWrapper>
  </S.ListContainer>
);

function mapStateToProps(state) {
  return {
    cards: selectors.getCards(state),
  };
}

export default connect(
  mapStateToProps,
  dispatch => ({ dispatch }),
)(SidebarAllItems);
