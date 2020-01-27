import React from "react";

import {Nav,Navbar} from 'react-bootstrap';

// import * as exports from 'react-bootstrap';

class Landing extends React.Component {
    constructor() {
      super();
      this.state = {
        err: ""
      };
    }
    

    render() {
        return (
        <Navbar style={{backgroundColor:"#BE0002"}} variant="dark"  > 
            <Navbar.Brand href="#">Leaver App</Navbar.Brand>
            <Nav className="mr-auto" >
            <Nav.Link href="./UploadExcel">Upload Excel</Nav.Link>
            <Nav.Link href="#resign">Resignation</Nav.Link>
            </Nav>
        </Navbar>
          );
        
    }

}

export default Landing;