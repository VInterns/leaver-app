import React from "react";

import { Nav, Navbar } from 'react-bootstrap';


export class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      err: ""
    };
  }


  render() {
    return (
      <Navbar style={{ backgroundColor: "#BE0002" }} variant="dark"  >
        <Navbar.Brand href="#">Leaver App</Navbar.Brand>
        <Nav className="mr-auto" >
          <Nav.Link href="/upload">Upload Excel</Nav.Link>
          <Nav.Link href="#resign">Resignation</Nav.Link>
          <Nav.Link href="/cc-consumer-activation-table">CC Consumer Activation</Nav.Link>
        </Nav>
      </Navbar>
    );

  }

}
