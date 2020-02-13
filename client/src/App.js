import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { authenticationReducer } from "./state";
import { PersistGate } from "redux-persist/integration/react";

import { ConnectedHeader, ConnectedPrivateRoute } from "./components";

import {
  UploadEmployeesScreen,
  UploadUsersScreen,
  CCConsumerActivation,
  ConsumerTable,
  ResignReqScreen,
  HrViewScreen,
  WorkForceScreen,
  WorkForceScreenDetail,
  ASTTableScreen,
  ASTResignationDetailScreen,
  ResignationsScreen,
  AuthenticationScreen,
  ELTTableScreen,
  ELTViewScreen,
  SHTTableScreen,
  SHTViewScreen,
  SMCTableScreen,
  SMCResignationDetailScreen,
  ManagerResignationsTableScreen
} from "./screens";

import "semantic-ui-css/semantic.min.css";

const persistConfig = {
  key: "leaveree",
  storage
};

const persistedReducer = persistReducer(persistConfig, authenticationReducer);

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
                <Route
                  path="/"
                  exact
                  component={props => (
                    <AuthenticationScreen
                      {...props}
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
                      loginWelcomeImg={null}
                    />
                  )}
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
                <ConnectedPrivateRoute
                  allowed={["admin", "hr"]}
                  path="/hr-view"
                  component={HrViewScreen}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "manager"]}
                  path="/resignations-details"
                  component={ResignationsScreen}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "smc"]}
                  path="/smc"
                  component={SMCTableScreen}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "smc"]}
                  path="/smc-view/:staffId/:lastWorkDay"
                  component={SMCResignationDetailScreen}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "cc"]}
                  path="/cc-consumer-activation-table"
                  component={ConsumerTable}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "cc"]}
                  path="/cc-consumer-activation/:staffId/:lastWorkDay"
                  component={CCConsumerActivation}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "manager"]}
                  path="/resign"
                  component={ResignReqScreen}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "ast"]}
                  path="/ast"
                  component={ASTTableScreen}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "ast"]}
                  path="/ast-resignation"
                  component={ASTResignationDetailScreen}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "elt"]}
                  path="/elt"
                  component={ELTTableScreen}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "elt"]}
                  path="/form-res"
                  component={ELTViewScreen}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "wf"]}
                  path="/wf-view"
                  component={WorkForceScreen}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "wf"]}
                  path="/wf-view-detail"
                  component={WorkForceScreenDetail}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "sht"]}
                  path="/sht"
                  component={SHTTableScreen}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "sht"]}
                  path="/sht-view"
                  component={SHTViewScreen}
                />
                <ConnectedPrivateRoute
                  allowed={["admin", "manager"]}
                  path="/my-resignations"
                  component={ManagerResignationsTableScreen}
                />
              </Switch>
            </Router>
          </>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
