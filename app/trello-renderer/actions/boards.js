import * as actionTypes from './actionTypes';

export const fetchBoardsRequest = (): BoardsAction => ({
  type: actionTypes.FETCH_BOARDS_REQUEST,
});
