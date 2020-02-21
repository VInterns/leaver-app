import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { authenticationReducer, registrationReducer } from './state';
import { PersistGate } from 'redux-persist/integration/react';

import { ConnectedHeader, ConnectedPrivateRoute } from "./components";

import {
  ConnectedManagerResignScreen,
  UploadEmployeesScreen,
  UploadUsersScreen,
  CCConsumerActivation,
  ConsumerTable,
  ConnectedResignScreen,
  HrViewScreen,
  WorkForceScreen,
  WorkForceScreenDetail,
  ASTTableScreen,
  ASTResignationDetailScreen,
  ResignationsScreen,
  RegistrationScreen,
  AuthenticationScreen,
  ELTTableScreen,
  ELTViewScreen,
  SHTTableScreen,
  SHTViewScreen,
  SMCTableScreen,
  SMCResignationDetailScreen,
  ManagerResignationsViewScreen
} from './screens';

import "semantic-ui-css/semantic.min.css";

const persistConfig = {
  key: 'leaver-app',
  storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({ auth: authenticationReducer, reg: registrationReducer }));

export let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware, thunkMiddleware))
);
let persistor = persistStore(store);

class App extends Component {
  Props: {
    isAuthenticated?: boolean,
    account?: Account
  };
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <>
            <ConnectedHeader />
            <Router>
              <Switch>
                <Route path="/" exact component={props => <AuthenticationScreen {...props}
                  headerText="Sign in to Leaver App"
                  subheaderText="Please insert your login details below"
                  loginText="Sign in"
                  signupHref="/signup"
                  signupText="Sign up"
                  signupHeader="Welcome to Leaver App"
                  signupSubheader="This is outsource Leaver-App System "
                  usernamePlaceholder="Organization email"
                  passwordPlaceholder="Your password"
                  logo={null}
                  loginWelcomeImg={null} />}
                />
                <Route path="/signup" component={props => <RegistrationScreen {...props}
                  headerText="Create an account in Leaver App"
                  verifyButtonText="Verify code"
                  verifyHeader="Verification"
                  verifyText="Please enter the 6-digit code we sent you on email"
                  getCodeText="Get Signup Code"
                  subheaderText="Please provide the required details below"
                  loginText="Sign in"
                  loginHref="/"
                  signupText="Sign up"
                  signupHeader="Welcome to Leaver App"
                  signupSubheader="This is outsource Leaver-App System"
                  usernamePlaceholder="Enter your Organization Email"
                  userCodePlaceholder="Secret code"
                  passwordPlaceholder="Create a Password"
                  createPasswordHeader="Create Your Password"
                  createPasswordText="Password must be at least 8 characters."
                  codeRequested={false}
                  logo={null}
                  signupWelcomeImg={null} />}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "hr"]}
                  path="/upload_users"
                  exact
                  component={UploadUsersScreen}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "hr"]}
                  path="/upload_employees"
                  exact
                  component={UploadEmployeesScreen}
                />
                <ConnectedPrivateRoute allowed={["admin", "hr"]} path="/hr-view" component={HrViewScreen} />
                <ConnectedPrivateRoute allowed={["admin", "manager"]} path="/resignations-details" component={ResignationsScreen} />
                <ConnectedPrivateRoute allowed={["admin", "smc"]} path="/smc" component={SMCTableScreen} />
                <ConnectedPrivateRoute allowed={["admin", "smc"]} path="/smc-view" component={SMCResignationDetailScreen} />
                <ConnectedPrivateRoute allowed={["admin", "cc"]} path="/cc-consumer-activation-table" component={ConsumerTable} />
                <ConnectedPrivateRoute allowed={["admin", "cc"]} path="/cc-consumer-activation/:staffId/:lastWorkDay" component={CCConsumerActivation} />
                <ConnectedPrivateRoute allowed={["admin", "manager"]} path="/resign" component={ConnectedResignScreen} />
                <ConnectedPrivateRoute allowed={["admin", "ast"]} path="/ast" component={ASTTableScreen} />
                <ConnectedPrivateRoute allowed={["admin", "ast"]} path="/ast-resignation" component={ASTResignationDetailScreen} />
                <ConnectedPrivateRoute allowed={["admin", "elt"]} path="/elt" component={ELTTableScreen} />
                <ConnectedPrivateRoute allowed={["admin", "elt"]} path="/form-res" component={ELTViewScreen} />
                <ConnectedPrivateRoute allowed={["admin", "wf"]} path="/wf-view" component={WorkForceScreen} />
                <ConnectedPrivateRoute allowed={["admin", "wf"]} path="/wf-view-detail" component={WorkForceScreenDetail} />
                <ConnectedPrivateRoute allowed={["admin", "sht"]} path="/sht" component={SHTTableScreen} />
                <ConnectedPrivateRoute allowed={["admin", "sht"]} path="/sht-view" component={SHTViewScreen} />
                <ConnectedPrivateRoute allowed={["admin", "manager"]} path="/my-resignations" component={ConnectedManagerResignScreen} />
                <ConnectedPrivateRoute allowed={["admin", "manager"]} path="/update-resignation" component={ManagerResignationsViewScreen} />

              </Switch>
            </Router>
          </>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
