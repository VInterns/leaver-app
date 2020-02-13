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
    "api/users/addPassword",
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
  let otp = randomize('0000000');

  makeRequest(
    dispatch,
    "api/mail/sendMail",
    {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        mailList: email,
        code: otp,
        subject: "Leaver App Signup Code",
        text: "Dear user,\n\nPlease find the following code to use it in your signup process to the Leaver App system.\n\nSignup Code: " + otp
      })
    },
    res => {
      if (res.status === 200){
        return res.json().then(result => {
          dispatch(sendCodeSuccessful())
        })
      } else {
        console.log(res);
        dispatch(sendCodeFailed())
      }
    }
  )
}

export const verifyCode = (user) => (dispatch) => {

  makeRequest(
    dispatch,
    "api/info/verifyCode",
    {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        email: user.username,
        toVerify: user.code
      })
    },
    res => {
      if (res.status === 200){
        return res.json().then(result => {
          console.log("Code Verified", result);
          dispatch(verifyCodeSuccess())
        })
      } else {
        dispatch(verifyCodeFailed())
      }
    }
  )
}

export const sendCodeSuccessful = () => ({
  type: actions.SEND_CODE_SUCCESS
})

export const initializeApp= ()=>{
  return { 
    type:actions.INIT_STATE
  };
}

export const verifyCodeSuccess = () => ({
  type:actions.VERIFY_CODE_SUCCESS
})

export const verifyCodeFailed = () => ({
  type:actions.VERIFY_CODE_FAILED
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


