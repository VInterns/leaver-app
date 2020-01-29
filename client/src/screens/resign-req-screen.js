import React, { Component } from 'react';
import {
  Container, Form, Row, Col,
  Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API = 'http://localhost:8080/api/search';
// const SEARCH = 'search'

// import '.resign-req-screen.css';
export class ResignReqScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        staffId: '',
        returnedHeadset: false,
        returnedkeys: false,
        returnedOhda: false,
        ohdaType:'',
        lastWorkDay:'',
        nationalId:'',
        nationalIdImg:null,
    };
  }
  
  onSearch = (e) => {
    e.preventDefault();
    // if (this.state.staffId !== '') {
      fetch(API, {
        body: JSON.stringify({staffId:this.state.staffId}),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      })
        .then(function (response) {
          console.log('toot-client');
          console.log(response);
          if (response.status === 200) {
            alert('recieved');
          } else {
            alert('Issues recieving');
          }
        });
      // }
  }


  render() {
    return (
      <Container>
        <br/>
        <h3 >Resignation Request</h3>
        <br/>
        <Form>
        <Form.Group >
              <Form.Group className="border border-primary">
                <Row >
                <Col><Form.Label>Staff ID</Form.Label></Col>
                <Col><Form.Control
                    name="id"
                    id="id"
                    placeholder="12345"
                    // size="sm"
                    className="form-control"
                    onChange={e => this.setState({staffId: e.target.value})}
                  /></Col>
                <Col>
                  <Button type="button" variant="danger" onClick={this.onSearch}>Search</Button>
                </Col>
              </Row>
            </Form.Group>
            <Row>
              <Col><Form.Label className="col-form-label">SAP Staff ID</Form.Label></Col>
              <Col ><Form.Control plaintext readOnly defaultValue="SAP Staff ID"/></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Employee Name</Form.Label></Col>
              <Col><Form.Control plaintext readOnly defaultValue="Employee Name"/></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Manager Name</Form.Label></Col>
              <Col><Form.Control plaintext readOnly defaultValue="Manager Name"/></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>NT Account</Form.Label></Col>
              <Col><Form.Control plaintext readOnly defaultValue="NT Account"/></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Department</Form.Label></Col>
              <Col><Form.Control plaintext readOnly defaultValue="Department"/></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Care Center</Form.Label></Col>
              <Col><Form.Control plaintext readOnly defaultValue="Care Center"/></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Job Title</Form.Label></Col>
              <Col><Form.Control plaintext readOnly defaultValue="Job Title"/></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Hiring Date</Form.Label></Col>
              {/* <Col><Form.Control plaintext readOnly defaultValue="Hiring Date"/></Col> */}
              <Col> <input type="date" id="start" name="hiring-date"
                min="2000-01-01" max="2025-12-31"></input></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Mobile Number</Form.Label></Col>
              <Col><Form.Control plaintext readOnly defaultValue="Mobile Number"/></Col>
              <Col></Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col><Form.Label>Returned Headset</Form.Label></Col>
              <Col>
              <Form.Control as="select">
                  <option>Yes</option>
                  <option>No</option>
              </Form.Control>
              </Col>
            </Row>
            <Row>
              <Col><Form.Label>Returned Keys</Form.Label></Col>
              <Col>
                <Form.Control as="select">
                    <option>No</option>
                    <option>Yes</option>
                </Form.Control>
              </Col>
            </Row>
            <Row>
              <Col><Form.Label>Returned 3ohda</Form.Label></Col>
              <Col>
                <Form.Control as="select">
                    <option>No</option>
                    <option>Yes</option>
                </Form.Control>
              </Col>
            </Row>
            <Row>
              <Col><Form.Label>3ohda Type</Form.Label></Col>
              <Col><Form.Control as="textarea" rows="1" required/></Col>
            </Row>
          </Form.Group>
          <Form.Group>
          <Row>
              <Col><Form.Label>Last Working Day</Form.Label></Col>
              {/* <Col><Form.Control rows="1" required/></Col> */}
              <Col> <input type="date" id="last" name="last-day"
                min="2018-01-01" max="2026-12-31"></input></Col>
            </Row>
            <Row>
              <Col><Form.Label>National ID Number</Form.Label></Col>
              <Col><Form.Control as="textarea" rows="1" required/></Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col><Form.Label>Copy of National ID</Form.Label></Col>
              <Col><Form.Control as="textarea" rows="1" required/></Col>
            </Row>
          </Form.Group>
          <br/>
          <Button type="submit" variant="danger" size="lg" block>Submit</Button>
        </Form>
      </Container>
    );
  }
}

// export default ResignReqScreen;