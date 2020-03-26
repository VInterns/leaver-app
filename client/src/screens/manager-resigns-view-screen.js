import React, { Component } from 'react';
import {
  Container, Form, Row, Col,
  Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = '/api/';
const SEARCH = 'users/search'
const UPDATE = 'resignations/update/request'

export class ManagerResignationsViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffId: '',
      sapStaffId: '',
      name: '',
      managerName: '',
      careCenter: '',
      jobTitle: '',
      hiringDate: '',
      department: '',
      subDepartment:'',
      ntAccount: '',
      mobile: '',
      lastWorkDay: '',
      recommended: 'recommended',
      reason : '',
      otherReason: '',
      returnedHeadset: false,
      returnedKeys: false,
      returnedLaptop: false,
      returnedLaptopBag: false,
      returnedMouse: false,
      comments: '',
      nationalId: '',
      createdby: '',
      resReq: {},
    };
  }

  componentDidMount() {

    let request = this.props.history.location.state.resignReq;
    let staffID = this.props.history.location.state.resignReq.staffId;

    this.searchUser(staffID)
    this.setState({
      resReq: request,
      managerName: request.managerName,
      ntAccount:request.phase1.ntAccount,
      lastWorkDay: request.phase1.lastWorkDay,
      mobile: request.phase1.mobile,
      recommended: request.phase1.recommended,
      returnedHeadset: request.phase1.returnedHeadset,
      returnedKeys: request.phase1.returnedKeys,
      returnedLaptop: request.phase1.returnedLaptop,
      returnedLaptopBag: request.phase1.returnedLaptopBag,
      returnedMouse: request.phase1.returnedMouse,
      comments: request.phase1.comments,
      nationalId: request.phase1.nationalId,
      createdby: request.createdby,
    })
  }

  searchUser = (id) => {
    fetch(API + SEARCH, {
      body: JSON.stringify({ staffId: id }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    })
      .then((response) => {
        if (response.status === 200) {
          return (response.json());
        } else {
          toast.error("User not found");
          return undefined;
        }
      })
      .then((data) => {
        if (data) {
          this.setState({
            staffId: data.staffId,
            sapStaffId: data.staffId,
            name: data.name,
            department: data.department,
            careCenter: data.careCenter,
            jobTitle: data.jobTitle,
            hiringDate: data.hiringDate,
          });
        }
      })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: this.normalizeVal(e.target.value) });
  }

  ///////////////////////////////////////////////
  normalizeVal(value) {
    if (value === 'true' || value === "on" || value === "Yes") {
      return true;
    }
    else if (value === "") {
      return "";
    }
    else if (value === 'false' || value === "off" || value === "No") {
      return false;
    }
    else {
      return value
    }
  }
  ///////////////////////////////////////////////

  onUpdate = (e) => {
    e.preventDefault();

    let phase1 = {
      ...this.state.resReq.phase1,
      subDepartment: this.state.subDepartment,
      ntAccount: this.state.ntAccount,
      recommended:this.state.recommended,
      reason: this.state.reason,
      otherReason: this.state.otherReason,
      returnedHeadset: this.state.returnedHeadset,
      returnedKeys: this.state.returnedKeys,
      returnedLaptop: this.state.returnedLaptop,
      returnedLaptopBag: this.state.returnedLaptopBag,
      returnedMouse: this.state.returnedMouse,
      comments: this.state.comments,
      ohdaType: this.state.ohdaType,
      lastWorkDay: this.state.lastWorkDay,
      status: 'Updated'
    };

    fetch(API + UPDATE, {
      method: "post",
      body: JSON.stringify({
        staffId: this.state.staffId,
        phase1: phase1
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Resignation Request Updated");
        }
        else if (response.status === 503) {
          toast.error("Error in db");
        }
        else {
          toast.error("Resigation Resquest cannot be updated");
          return undefined;
        }
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    return (
      <Container fluid className='p-5 bg-light'>
        <h3 className='text-center'>Resignation Request</h3>
        <ToastContainer />
        <div className="row">
          <div className="offset-md-3 col-md-6 border rounded bg-white">
          <Form className='mt-4'>
          <Form.Group className='p-5'>
            <Row className='mt-2'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  SAP Staff ID
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  value={this.state.sapStaffId}
                />
              </Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>Employee Name</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.name} /></Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>Manager Name</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.managerName} /></Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>NT Account</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.ntAccount} /></Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>Department</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.department} /></Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>Cost Center</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.careCenter} /></Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>Job Title</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.jobTitle} /></Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>Hiring Date</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.hiringDate} /></Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>Mobile Number</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.mobile} /></Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>Recommended to Join Vodafone</Form.Label></Col>
              <Col><input
                name="recommended"
                type="checkbox"
                checked={this.state.recommended}
                // onChange = {this.handleChange}
                className="p-2 form-control col-sm-1 text-center"
              /></Col>
              <Col></Col>
            </Row>
          </Form.Group>
          <Form.Group className="p-2 border border-danger required" >
            <Row className='mt-2'>
              <Col><Form.Label>Returned Headset</Form.Label></Col>
              <Col>
                <Form.Control as="select" name="returnedHeadset" onChange={this.handleChange} value={this.state.returnedHeadset}>
                  <option value={""}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label>Returned Keys</Form.Label></Col>
              <Col>
                <Form.Control as="select" name="returnedKeys" onChange={this.handleChange} value={this.state.returnedKeys}>
                  <option value={""}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label>Returned 3ohda</Form.Label></Col>
              <Col>
                <Form.Control as="select" name="returnedOhda" onChange={this.handleChange} value={this.state.returnedOhda}>
                  <option value={""}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label>3ohda Type</Form.Label></Col>
              <Col><Form.Control as="textarea" rows="1" name="ohdaType" onChange={this.handleChange} value={this.state.ohdaType} /></Col>
            </Row>
          </Form.Group>
          <Form.Group className="p-2 border border-danger">
            <Row className='mt-2'>
              <Col><Form.Label>Last Working Day</Form.Label></Col>
              <Col> <input type="date" id="last" name="lastWorkDay"
                min="2018-01-01" max="2026-12-31" onChange={this.handleChange} value={this.state.lastWorkDay}></input></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label>National ID Number</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.nationalId} /></Col>
            </Row>
          </Form.Group>
          <br />
          <Button type="submit" variant="danger" size="lg" onClick={this.onUpdate} block>Update</Button>
        </Form>
        </div>
        </div>
      </Container>
    );
  }
}
