// to do -> redirect after Submit
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
      returnedHeadset: false,
      returnedKeys: false,
      returnedOhda: false,
      ohdaType: '',
      lastWorkDay: '',
      nationalId: '',
      nationalIdImg: null,
      annualsGranted: '',
      annualsTaken: '',
      noShow: '',
      lostHours: '',
      daysToTake: '',
      sapStaffId: '',
      name: '',
      managerName: '',
      ntAccount: '',
      department: '',
      careCenter: '',
      jobTitle: '',
      hiringDate: '',
      mobile: '',
      iex: '',
      personalMobile: '',
      recommended: false,
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
      returnedHeadset: request.phase1.returnedHeadset,
      returnedKeys: request.phase1.returnedKeys,
      returnedOhda: request.phase1.returnedOhda,
      ohdaType: request.phase1.ohdaType,
      lastWorkDay: request.phase1.lastWorkDay,
      nationalId: request.phase1.nationalId,
      nationalIdImg: request.phase1.nationalIdImg,
      annualsGranted: request.phase1.annualsGranted,
      annualsTaken: request.phase1.annualsTaken,
      noShow: request.phase1.noShow,
      lostHours: request.phase1.lostHours,
      daysToTake: request.phase1.daysToTake,
      iex: request.phase1.iex,
      personalMobile: "+" + request.phase1.personalMobile,
      recommended: request.phase1.recommended,
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
            managerName: data.managerName,
            ntAccount: data.ntAccount,
            department: data.department,
            careCenter: data.careCenter,
            jobTitle: data.jobTitle,
            hiringDate: data.hiringDate,
            mobile: "+" + data.mobile
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
      returnedHeadset: this.state.returnedHeadset,
      returnedKeys: this.state.returnedKeys,
      returnedOhda: this.state.returnedOhda,
      ohdaType: this.state.ohdaType,
      iex: this.state.iex,
      annualsGranted: this.state.annualsGranted,
      annualsTaken: this.state.annualsTaken,
      noShow: this.state.noShow,
      lostHours: this.state.lostHours,
      daysToTake: this.state.daysToTake,
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
      <Container >
        <br />
        <h3>Resignation Request</h3>
        <br />
        <ToastContainer />
        <Form >
          <Form.Group >
            <Row>
              <Col><Form.Label className="col-form-label">SAP Staff ID</Form.Label></Col>
              <Col ><Form.Control plaintext readOnly value={this.state.sapStaffId} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Employee Name</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.name} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Manager Name</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.managerName} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>NT Account</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.ntAccount} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Department</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.department} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Cost Center</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.careCenter} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Job Title</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.jobTitle} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Hiring Date</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.hiringDate} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Mobile Number</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.mobile} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Personal Mobile Number</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.personalMobile} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Recommended to Join Vodafone</Form.Label></Col>
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
            <Row>
              <Col><Form.Label>Returned Headset</Form.Label></Col>
              <Col>
                <Form.Control as="select" name="returnedHeadset" onChange={this.handleChange} value={this.state.returnedHeadset}>
                  <option value={""}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Col>
            </Row>
            <Row>
              <Col><Form.Label>Returned Keys</Form.Label></Col>
              <Col>
                <Form.Control as="select" name="returnedKeys" onChange={this.handleChange} value={this.state.returnedKeys}>
                  <option value={""}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Col>
            </Row>
            <Row>
              <Col><Form.Label>Returned 3ohda</Form.Label></Col>
              <Col>
                <Form.Control as="select" name="returnedOhda" onChange={this.handleChange} value={this.state.returnedOhda}>
                  <option value={""}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Col>
            </Row>
            <Row>
              <Col><Form.Label>3ohda Type</Form.Label></Col>
              <Col><Form.Control as="textarea" rows="1" name="ohdaType" onChange={this.handleChange} value={this.state.ohdaType} /></Col>
            </Row>
          </Form.Group>
          <Form.Group className="p-2 border border-danger">
            <Row>
              <Col><Form.Label>Leave Balance</Form.Label></Col>
              <Col></Col>
              <Col><Form.Label>IEX</Form.Label></Col>
              <Col><Form.Control as="textarea" rows="1" name="iex" onChange={this.handleChange} value={this.state.iex} /></Col>
            </Row>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Annuals Granted</th>
                  <th scope="col">Annuals Taken</th>
                  <th scope="col">No Show</th>
                  <th scope="col">Lost Hours</th>
                  <th scope="col">In Lieu days to take</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><Form.Control as="textarea" rows="1" name="annualsGranted" onChange={this.handleChange} value={this.state.annualsGranted} /></th>
                  <td><Form.Control as="textarea" rows="1" name="annualsTaken" onChange={this.handleChange} value={this.state.annualsTaken} /></td>
                  <td><Form.Control as="textarea" rows="1" name="noShow" onChange={this.handleChange} value={this.state.noShow} /></td>
                  <td><Form.Control as="textarea" rows="1" name="lostHours" onChange={this.handleChange} value={this.state.lostHours} /></td>
                  <td><Form.Control as="textarea" rows="1" name="daysToTake" onChange={this.handleChange} value={this.state.daysToTake} /></td>
                </tr>
              </tbody>
            </table>
          </Form.Group>
          <Form.Group className="p-2 border border-danger">
            <Row>
              <Col><Form.Label>Last Working Day</Form.Label></Col>
              <Col> <input type="date" id="last" name="lastWorkDay"
                min="2018-01-01" max="2026-12-31" onChange={this.handleChange} value={this.state.lastWorkDay}></input></Col>
            </Row>
            <Row>
              <Col><Form.Label>National ID Number</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.nationalId} /></Col>
            </Row>
          </Form.Group>
          <Form.Group className="p-2 border border-danger">
            <Row>
              <Col><Form.Label>Copy of National ID</Form.Label></Col>
              <Col>
                {this.state.nationalIdImg && <img
                  alt={`${this.state.nationalIdImg.fileName}`}
                  src={`${this.state.nationalIdImg.dataURL}`}
                />}
              </Col>
            </Row>
          </Form.Group>
          <br />
          <Button type="submit" variant="danger" size="lg" onClick={this.onUpdate} block>Update</Button>
        </Form>
        <br />
        <br />
      </Container>
    );
  }
}
