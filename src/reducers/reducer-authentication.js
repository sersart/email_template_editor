import allReducers from './index';
import { appConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, token: user.token } : { loggedIn: false, token: undefined };

export default function (state = initialState, action) {
  switch (action.type) {
    case appConstants.LOGIN_REQUEST:
      return { 'loggedIn': false, 'token': undefined };
    case appConstants.LOGIN_SUCCESS:
      return { 'loggedIn': true, 'token': action.token };
    case appConstants.LOGIN_FAILURE:
      return { loggedIn: false, user: undefined };
    case appConstants.LOGOUT:
      action.type = "RESET";
      state = undefined;
      allReducers(state, action);
      return {};
    default:
      return state
  }
}