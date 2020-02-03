import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { authenticationReducer } from './state';
import { PersistGate } from 'redux-persist/integration/react';

import { ConnectedHeader, ConnectedPrivateRoute } from './components';

import {
  UploadExcelScreen,
  CCConsumerActivation,
  consumerTable,
  ResignReqScreen,
  HrViewScreen,
  ASTTableScreen,
  ASTResignationDetailScreen,
  ResignationsScreen,
  AuthenticationScreen,
  FormRes,
  ELTTableScreen

} from './screens';

import 'semantic-ui-css/semantic.min.css';

const persistConfig = {
  key: 'leaver',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authenticationReducer);

let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware, thunkMiddleware)),
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
                <Route path="/" exact component={props => <AuthenticationScreen {...props} headerText="Sign in to Leaver App"
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

                <ConnectedPrivateRoute path="/upload" exact allowed={["admin"]} component={UploadExcelScreen} />
                <ConnectedPrivateRoute allowed={["admin"]} path="/hr-view" component={HrViewScreen} />
                <ConnectedPrivateRoute allowed={["admin"]} path="/resignations-details" component={ResignationsScreen} />
                <ConnectedPrivateRoute allowed={["admin"]} path="/cc-consumer-activation-table" component={consumerTable} />
                <ConnectedPrivateRoute allowed={["admin"]} path="/cc-consumer-activation" component={CCConsumerActivation} />
                <ConnectedPrivateRoute allowed={["admin"]} path="/resign" component={ResignReqScreen} />
                <ConnectedPrivateRoute allowed={["admin"]} path="/ast" component={ASTTableScreen} />
                <ConnectedPrivateRoute allowed={["admin"]} path="/ast-resignation" component={ASTResignationDetailScreen} />
                <ConnectedPrivateRoute allowed={["admin"]} path="/elt" component={ELTTableScreen} />
                <ConnectedPrivateRoute allowed={["admin"]} path="/form-res" component={FormRes} />
              </Switch>
            </Router>
          </>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

