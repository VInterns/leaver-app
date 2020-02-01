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
          <Nav.Link href="/resign">Resignation</Nav.Link>
          <Nav.Link href="/hr-view">HR View</Nav.Link>
          <Nav.Link href="/ast">AST View</Nav.Link>
        </Nav>
      </Navbar>
    );

  }

}
