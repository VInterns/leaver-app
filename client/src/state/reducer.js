import * as actions from './actions';
import { AuthenticationInitialState, RegistrationInitialState } from './state';

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

    case actions.INIT_STATE:{
      return AuthenticationInitialState;
    }

    default:
      return state;
  }
}



export function registrationReducer(
  state =RegistrationInitialState,
  action,
) {
  switch (action.type){
    case actions.SIGNUP_SUCCESS : {
      return {
        ...state,
        isRegistered: true,
        errorMessage: "",
        loading: false
      };
    }


    case actions.SIGNUP_FAILED: {
      return {
        ...state,
        isRegistered: false,
        errorMessage: action.payload,
        loading: false
      }
    }

    case actions.SEND_CODE_SUCCESS: {
      return {
        ...state,
        codeRequested: true
      }
    }

    case actions.SEND_CODE_FAILED : {
      return {
        ...state,
        codeRequested: false
      }
    }

    case actions.INIT_STATE:{
      return RegistrationInitialState;
    }

    default:
    return state;
  }
}