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
  CCConsumerActivation,
  consumerTable
} from './screens';

import './App.css';
class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Router>
          <Switch>
            <Route path="/" exact component={LoginScreen} />
            <Route path="/upload" component={UploadExcelScreen} />
            <Route path="/cc-consumer-activation-table" component={consumerTable} />
            <Route path="/cc-consumer-activation" component={CCConsumerActivation} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;