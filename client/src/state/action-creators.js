import * as actions from './actions';

export const login = (credentials) => (dispatch) =>
  makeRequest(
    dispatch,
    "http://localhost:8080/api/login",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(credentials)
    },
    res => {
      if (res.status === 200) {
        return res.json().then(account => {
          dispatch(loginSuccessful(account));
        });
      } else {
        dispatch(loginFailed());
      }
    }
  );

export const loginSuccessful = (account: Account) => ({
  type: actions.LOGIN_SUCCEESS,
  payload: account
});

export const loginFailed = () => ({
  type: actions.LOGIN_FAILED
});

export const logoutSuccessful = () => ({
  type: actions.LOGOUT
});


export const logout = () => (dispatch) => {
  makeRequest(dispatch, "http://localhost:8080/api/login", { method: "DELETE" }, res => {
    if (res.status === 204) {
      dispatch(logoutSuccessful());
    }
  });
};

export const requestStarted = () => ({
  type: actions.SET_LOADING
});

export const requestFinished = () => ({
  type: actions.SET_NOT_LOADING
});



export const makeRequest = (
  dispatch,
  url,
  options = undefined,
  callback = () => { }
) => {
  dispatch(requestStarted());
  return fetch(url, options)
    .then(res => callback(res))
    .then(value => {
      dispatch(requestFinished());
      return value;
    })
    .catch(err => {
      dispatch(requestFinished());
      throw err;
    });
};