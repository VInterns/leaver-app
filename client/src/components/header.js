import React from "react";
import { connect } from "react-redux";
import { Nav, Navbar } from "react-bootstrap";
import { bindActionCreators } from 'redux';

import { logout } from '../state'
export class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      err: ""
    };
  }

  static mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      account: state.auth.account
    };
  };


  static mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout }, dispatch);
  }


  render() {
    console.log(this.props)
    if (!this.props.isAuthenticated) {
      return null;
    }
    return (
      <Navbar style={{ backgroundColor: "#BE0002" }} variant="dark">
        <Navbar.Brand >Leaver App</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/upload">Upload Users</Nav.Link>
          <Nav.Link href="/resign">Resignation Request</Nav.Link>
          <Nav.Link href="/smc">Customer Care</Nav.Link>
          <Nav.Link href="/wf-view">Work Force</Nav.Link>
          <Nav.Link href="/cc-consumer-activation-table">
            CC Consumer Activation
          </Nav.Link>
          <Nav.Link href="/ast">Application Security</Nav.Link>
          <Nav.Link href="/elt">Entrprise Logistics</Nav.Link>
          <Nav.Link href="/sht">Security Hardware Token</Nav.Link>
          <Nav.Link href="/hr-view">Human Resources</Nav.Link>
        </Nav>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Link position="right" onClick={() => {
            this.props.logout();
          }} >Logout</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}


export const ConnectedHeader = connect(Header.mapStateToProps, Header.mapDispatchToProps)(Header);
