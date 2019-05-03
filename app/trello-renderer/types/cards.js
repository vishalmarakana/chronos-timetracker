// @flow
import * as actionTypes from '../actions/actionTypes/cards';
import type {
  Id,
} from '.';


export type CardsAction =
  {|
    type: typeof actionTypes.FETCH_CARDS_REQUEST,
  |};

export type Card = {
  id: string,
  badges: {
    votes: number,
    viewingMemberVoted: boolean,
    subscribed: boolean,
    fogbugz: string,
    checkItems: number,
    checkItemsChecked: number,
    comments: number,
    attachments: number,
    description: boolean,
    due: Date | null,
    dueComplete: boolean
  },
  closed: false,
  dueComplete: false,
  dateLastActivity: Date,
  desc: string,
  descData: null | {
    emoji: {
      morty: string,
    },
  },
  due: Date | null,
  email: null,
  idBoard: string,
  idList: string,
  idMembers: Array<string>,
  idMembersVoted: Array<string>,
  idShort: number,
  idAttachmentCover: string,
  manualCoverAttachment: false,
  labels: Array<{
      id: string,
      idBoard: string,
      name: string,
      color: string,
    }>,
  idLabels: Array<string>,
  name: string,
  pos: number,
  shortLink: string,
  shortUrl: string,
  subscribed: boolean,
  url: string,
  address: string,
  locationName: string,
  coordinates: {
    latitude: string,
    longitude: string,
  }
};

export type CardsResources = {
  [Id]: Card,
}
