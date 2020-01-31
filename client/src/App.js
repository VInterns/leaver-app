import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import { Header } from './components';

import {
  LoginScreen,
  UploadExcelScreen,
  ResignReqScreen,
  HrViewScreen,
  WorkForceScreen,
  WorkForceScreenDetail
} from './screens';

import './App.css';
class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Router>
          <Switch>
            <Route path = "/" exact component={LoginScreen} />
            <Route path = "/upload" component={UploadExcelScreen} />
	          <Route path = "/resign" component={ResignReqScreen} />
            <Route path = "/hr-view" component={HrViewScreen}/>
            <Route path = "/wf-view" component={WorkForceScreen}/>
            <Route path = "/wf-view-detail" component = {WorkForceScreenDetail}/>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
