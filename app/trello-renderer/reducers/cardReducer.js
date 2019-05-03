// @flow
import {
  actionTypes,
} from 'trello-actions';

const initialState = {
  currentCardId: null,
};

function cardReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CARD_ID:
      return {
        ...state,
        currentCardId: action.payload,
      };
    case actionTypes.__CLEAR_ALL_REDUCERS__:
      return initialState;
    default:
      return state;
  }
}

export default cardReducer;
