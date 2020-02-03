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
  Resignations,
  FormRes,
  ELTTableScreen
} from './screens';

import './App.css';
//import { Form } from 'react-bootstrap/lib/Navbar';
class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Router>
          <Switch>
            <Route path="/" exact component={LoginScreen} />
            <Route path="/upload" component={UploadExcelScreen} />
            <Route path="/resignations" component={Resignations} />
            <Route path="/elt" component = {ELTTableScreen}/>
            <Route path="/form-res" component={FormRes} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;