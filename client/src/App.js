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

import { Header, PrivateRoute } from './components';

import {
  UploadExcelScreen,
  CCConsumerActivation,
  consumerTable,
  ResignReqScreen,
  HrViewScreen,
  ResignationsScreen,
  AuthenticationScreen
} from './screens';

import 'semantic-ui-css/semantic.min.css';

const persistConfig = {
  key: 'leaver-app',
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
    console.log(this.props)
    const state = store.getState();
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <>
            {
              state.isLoggedIn && <Header account={state.account} />
            }
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
                <PrivateRoute path="/upload"
                  exact
                  allowed={["admin"]}
                  component={UploadExcelScreen}
                  isAuthenticated={state.isAuthenticated}
                  account={state.account}
                />
                <Route path="/hr-view" component={HrViewScreen} />
                <Route path="/resignations-details" component={ResignationsScreen} />
                <Route path="/cc-consumer-activation-table" component={consumerTable} />
                <Route path="/cc-consumer-activation" component={CCConsumerActivation} />
                <Route path="/resign" component={ResignReqScreen} />
              </Switch>
            </Router>
          </>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;