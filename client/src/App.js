import React, { Component } from 'react';
// import Chat from './components/Chat';
import Login from './components/Login';
import UploadExcel from './components/UploadExcel';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Landing from './components/Landing';
 

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          {/* <Route path="/chat" component={Chat} /> */}
          <Route path="/landing" component={Landing} />
          <Route path="/UploadExcel" component={UploadExcel} />
        </Switch>
      </Router>
    );
  }
}
 
export default App;