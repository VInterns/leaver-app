import * as actions from './actions';
import { AuthenticationInitialState } from './state';

export function authenticationReducer(
  state = AuthenticationInitialState,
  action,
) {
  switch (action.type) {
    case actions.TRY_LOGIN: {
      return {
        ...state,
        loading: true,
        username: action.payload.username,
      };
    }

    case actions.LOGIN_SUCCEESS: {
      return {
        ...state,
        username: action.payload.username,
        isAuthenticated: true,
        errorMessage: '',
        loading: false,
        account: action.payload
      };
    }

    case actions.LOGIN_FAILED: {
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: action.payload,
        loading: false,
      };
    }

    case actions.LOGOUT: {
      return AuthenticationInitialState;
    }

    case actions.SET_LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    case actions.SET_NOT_LOADING: {
      return {
        ...state,
        loading: false
      };
    }

    default:
      return state;
  }
}
