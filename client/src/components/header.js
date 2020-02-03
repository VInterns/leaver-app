import React from "react";
import { connect } from "react-redux";
import { Nav, Navbar } from "react-bootstrap";

export class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      err: ""
    };
  }

  render() {
    if (!this.props.isAuthenticated) {
      return null;
    }
    return (
      <Navbar style={{ backgroundColor: "#BE0002" }} variant="dark">
        <Navbar.Brand href="/">Leaver App</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/upload">Upload Users</Nav.Link>
          <Nav.Link href="/resign">Resignation</Nav.Link>
          <Nav.Link href="/cc-consumer-activation-table">
            CC Consumer Activation
          </Nav.Link>
          <Nav.Link href="/hr-view">Human Resources</Nav.Link>
          <Nav.Link href="/ast">Application Security</Nav.Link>
          <Nav.Link href="/elt">Entrprise Logistics</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    account: state.account
  };
};

export const ConnectedHeader = connect(mapStateToProps)(Header);
