// @flow
import React from 'react';
import {
  connect,
} from 'react-redux';

import {
  DateTime,
} from 'luxon';

import * as R from 'ramda';

import type {
  StatelessFunctionalComponent,
  Node,
} from 'react';
import type {
  Dispatch,
  Card,
} from 'trello-types';

import {
  attachmentsIcon,
  duedateIcon,
  commentsIcon,
  descriptionIcon,
  checkIcon,
  checkboxIcon,
  subscribeIcon,
} from 'trello-assets'

import * as selectors from 'trello-selectors';
import * as actions from 'trello-actions';
import * as S from './styled';

import CardsHeader from './CardsHeader';

type Props = {
  cards: Array<Card>,
  dispatch: Dispatch,
};

const SidebarAllItems: StatelessFunctionalComponent<Props> = ({
  cards,
  dispatch,
}: Props): Node => (
  <S.ListContainer>
    <CardsHeader />
    <S.CardsWrapper>
      {cards && cards.length > 0 && cards.map(({ badges, ...card }) => (
        <S.Card
          key={card.id}
          onClick={() => dispatch(actions.setCurrentCardId({ currentCardId: card.id }))}
        >
          <S.CardLabelsWrapper>
            {card?.labels?.map(({
              id,
              name,
              color,
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
            {badges && Object.keys(badges).map(key => !R.isNil(badges[key]) && ({
              due: (
                <S.DueBadge
                  dueComplete={badges.dueComplete}
                  isDeadlineCrossed={(
                    DateTime
                      .local()
                      .valueOf()) > (
                    DateTime
                      .fromISO(badges[key])
                      .valueOf()
                  )}
                >
                  <S.BadgeIcon
                    src={duedateIcon}
                    alt="duedateIcon"
                    processSVG={(code) => {
                      if (badges.dueComplete || (
                        DateTime
                          .local()
                          .valueOf() > (
                          DateTime
                            .fromISO(badges[key])
                            .valueOf())
                      )) {
                        return code.replace(/fill=".*?"/g, 'fill="#fff"');
                      }
                      return code.replace(/fill=".*?"/g, 'fill="#959da1"');
                    }}
                  />
                  &nbsp;
                  {DateTime.fromISO(badges[key]).toFormat('dd MMM yyyy')}
                </S.DueBadge>
              ),
              checkItems: (
                <S.CheckItemsBadge>
                  {badges.checkItemsChecked > 0 ? (
                    <S.BadgeIcon
                      src={checkIcon}
                      alt="checkedIcon"
                    />
                  ) : (
                    <S.BadgeIcon
                      src={checkboxIcon}
                      alt="checkboxIcon"
                    />
                  )}
                  {`${badges.checkItemsChecked}/${badges[key]}`}
                </S.CheckItemsBadge>
              ),
              subscribed: (
                <S.SubscriptionBadge>
                  <S.BadgeIcon
                    src={subscribeIcon}
                    alt="subscribeIcon"
                  />
                </S.SubscriptionBadge>
              ),
              attachments: (
                <S.SubscriptionBadge>
                  <S.BadgeIcon
                    src={attachmentsIcon}
                    alt="attachmentsIcon"
                  />
                  {badges[key]}
                </S.SubscriptionBadge>
              ),
              description: (
                <S.SubscriptionBadge>
                  <S.BadgeIcon
                    src={descriptionIcon}
                    alt="descriptionIcon"
                  />
                </S.SubscriptionBadge>
              ),
              comments: (
                <S.CommentsBadge>
                  <S.BadgeIcon
                    src={commentsIcon}
                    alt="commentsIcon"
                  />
                  {badges[key]}
                </S.CommentsBadge>
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
