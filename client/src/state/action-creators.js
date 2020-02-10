import * as actions from './actions';
var randomize = require('randomatic');

export const login = (credentials) => (dispatch) =>
  makeRequest(
    dispatch,
    "/api/login",
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


export const signup = (credentials) => (dispatch) => 
  makeRequest(
    dispatch,
    "api/users/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(credentials)
    },
    res => {
      if (res.status === 200){
        return res.json().then(result => {
          dispatch(signupSuccessful());
        })
      } else{
        dispatch(signupFailed())
      }
    }
  )

export const sendCode = (email) => (dispatch) => {
  makeRequest(
    dispatch,
    "api/mail/sendCode",
    {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        mailList: [email],
        subject: "Leaver App Signup Code",
        text: `Dear user @ email,\nPlease find the following code to use
        int your signup process to the Leaver App system.\n
        Signup Code: ${randomize('000000')}
        `
      })
    },
    res => {
      if (res.status === 200){
        return res.json().then(result => {
          console.log("SendCode Success::" , result);
          dispatch(sendCodeSuccessful())
        })
      } else {
        dispatch(sendCodeFailed())
      }
    }
  )
}


export const sendCodeSuccessful = () => ({
  type: actions.SEND_CODE_SUCCESS
})


export const sendCodeFailed = () => ({
  type: actions.SEND_CODE_FAILED
})

export const signupSuccessful = () => ({
  type: actions.SIGNUP_SUCCESS
})

export const signupFailed = () => ({
  type: actions.SIGNUP_FAILED
})


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
  makeRequest(dispatch, "/api/login", {
    method: "DELETE",
    headers: { "content-type": "application/json" }
  }, res => {
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