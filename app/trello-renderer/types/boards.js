// @flow
import * as actionTypes from '../actions/actionTypes/boards';
import type {
  Id,
} from '.';


export type BoardsAction =
  {|
    type: typeof actionTypes.FETCH_BOARDS_REQUEST,
  |};

export type Board = {
    id: string,
    name: string,
    desc: string,
    descData: string,
    closed: boolean,
    idOrganization: string,
    invited: boolean,
    limits: {
      attachments: {
        perBoard: {
          status: string,
          disableAt: number,
          warnAt: number
        }
      },
      boards: {
        totalMembersPerBoard: {
          status: string,
          disableAt: number,
          warnAt: number
        }
      },
      cards: {
        openPerBoard: {
          status: string,
          disableAt: number,
          warnAt: number
        },
        totalPerBoard: {
          status: string,
          disableAt: number,
          warnAt: number
        }
      },
      checklists: {
        perBoard: {
          status: string,
          disableAt: number,
          warnAt: number
        }
      },
      customFields: {
        perBoard: {
          status: string,
          disableAt: number,
          warnAt: number
        }
      },
      labels: {
        perBoard: {
          status: string,
          disableAt: number,
          warnAt: number
        }
      },
      lists: {
        openPerBoard: {
          status: string,
          disableAt: number,
          warnAt: number
        },
        totalPerBoard: {
          status: string,
          disableAt: number,
          warnAt: number
        }
      }
    },
    memberships: [
      {
        id: string,
        idMember: string,
        memberType: string,
        unconfirmed: boolean
      },
      {
        id: string,
        idMember: string,
        memberType: string,
        unconfirmed: boolean
      }
    ],
    pinned: boolean,
    starred: boolean,
    url: string,
    prefs: {
      permissionLevel: string,
      voting: string,
      comments: string,
      invitations: string,
      selfJoin: boolean,
      cardCovers: boolean,
      cardAging: string,
      calendarFeedEnabled: boolean,
      background: string,
      backgroundImage: string,
      backgroundImageScaled: Array<
        {
          width: number,
          height: number,
          url: string,
        },
        {
          width: number,
          height: number,
          url: string
        },
        {
          width: number,
          height: number,
          url: string
        },
        {
          width: number,
          height: number,
          url: string,
        },
        {
          width: number,
          height: number,
          url: string
        },
        {
          width: number,
          height: number,
          url: string
        },
        {
          width: number,
          height: number,
          url: string,
        },
        {
          width: number,
          height: number,
          url: string
        },
        {
          width: number,
          height: number,
          url: string,
        },
        {
          width: number,
          height: number,
          url: string
        }
      >,
      backgroundTile: boolean,
      backgroundBrightness: string,
      backgroundBottomColor: string,
      backgroundTopColor: string,
      canBePublic: string,
      canBeOrg: string,
      canBePrivate: string,
      canInvite: boolean
    },
    invitations: Array<string>,
    shortLink: string,
    subscribed: boolean,
    labelNames: {
      green: string,
      yellow: string,
      orange: string,
      red: string,
      purple: string,
      blue: string,
      sky: string,
      lime: string,
      pink: string,
      black: string
    },
    powerUps: Array<string>,
    dateLastActivity: string,
    dateLastView: string,
    shortUrl: string,
    idTags: Array<string>,
    datePluginDisable: boolean
};

export type BoardsResources = {
  [Id]: Board,
}
