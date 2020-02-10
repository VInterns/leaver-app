import React from "react";
import { connect } from "react-redux";
import { Nav, Navbar } from "react-bootstrap";
import { bindActionCreators } from 'redux';

import { logout } from '../state'
export class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      err: "",
      resign_req_users : ["manager","hr"],

    };
    // const resign_req_users = ["manager","hr"];
  }

  static mapStateToProps(state) {
    return {
      isAuthenticated: state.isAuthenticated,
      account: state.account
    };
  };


  static mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout }, dispatch);
  }

  checkAuth = (allowed_users,user_roles) => {
    const found = allowed_users.some(r=> user_roles.indexOf(r) >= 0);
    return found;
  }

  render() {
    if (!this.props.isAuthenticated) {
      return null;
    }
    return (
      <Navbar style={{ backgroundColor: "#BE0002" }} variant="dark">
        <Navbar.Brand >Leaver App</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/upload">Upload Users</Nav.Link>
          {console.log(this.props.account.role)}
          {this.checkAuth(this.state.resign_req_users,this.props.account.role) && <Nav.Link href="/resign">Resignation Request</Nav.Link>}
          {/* {this.props.account.role === "finance" && <Nav.Link href="/resign">Resignation Request</Nav.Link>} */}
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
