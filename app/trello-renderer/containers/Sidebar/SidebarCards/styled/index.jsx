import styled, { css } from 'styled-components';


export const ListContainer = styled.div`
  height: 100%;
  backgroundColor: rgba(0, 255, 0, .5);
  flex: 1;
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  background: #EDEFF0;
  border: 1px solid #D6DADC;
  border-bottom: 0;
  min-width: 80px;
  &:last-child {
    border-bottom: 1px;
  }
`;

export const CardLabelsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 8px 0;
`;

export const CardLabel = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #ffffff;
  font-weight: 600;
  background-color: ${({ labelColor }) => {
    switch(labelColor) {
      case 'orange':
        return '#E99E40';
      case 'blue':
        return '#026AA7';
      case 'green':
        return '#5AAC44';
      case 'red':
        return '#CF513D';
      case 'yellow':
        return '#E6C60D';
      case 'purple':
        return '#A86CC1';
      case 'pink':
        return '#E76EB1';
      case 'sky':
        return '#00AECC';
      case 'lime':
        return '#4FD683';
      default:
        return '#0C3953'; 
    }
  }};
  height: ${({ isTextVisible }) => isTextVisible ? '16px': '8px'};

  border-radius: 2px;
  margin: 0 4px 2px 0;

  padding: 0 8px;
  line-height: 15px;
`;

export const CardName = styled.div`
`;

export const CardBadgesWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 8px 0;
`;

export const CardBadge = styled.span`
  height: 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #838C91;
  padding: 0 8px;
  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`;

export const BadgeIcon = styled.img`
  height: 14px;
  cursor: pointer;
`;

export const SubscriptionBadge = styled(CardBadge)``;

export const CommentsBadge = styled(CardBadge)``;

export const AttachmentsBadge = styled(CardBadge)``;

export const CheckItemsBadge = styled(CardBadge)``;

export const DueBadge = styled(CardBadge)``;

export const VotesBadge = styled(CardBadge)``;

export const LocationBadge = styled(CardBadge)``;

export const DescriptionBadge = styled(CardBadge)``;

export const CardMembers = styled.div``;

