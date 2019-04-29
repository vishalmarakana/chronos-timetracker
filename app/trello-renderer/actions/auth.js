import * as actionTypes from './actionTypes';


export const authRequest = ({ token }) => ({
  type: actionTypes.AUTH_REQUEST,
  token,
});
