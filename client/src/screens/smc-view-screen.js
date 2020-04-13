import React from "react";
import {
  LeaverDetails
} from "../components";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Container, Header } from 'semantic-ui-react';
import { ToastContainer, toast } from "react-toastify";

/////////////////////////////////////////////////////////////////////////
const API = "/api";
const ROUTE = "/resignations/update/phase2";
const DONE = "done";
const PENDING = "pending";
const UK_SUBDEPT = ["--", "UK", "UK Telesales"];
const CLUSTER_SUBDEPT = [
  "--",
  "IR",
  "IR Telesales",
  "GE",
  "Spain",
  "CIOT",
  "VAS",
  "VDA",
  "Others"
];
const ENTERPRISE_SUBDEPT = [
  "--",
  "UK SMB",
  "IR SME",
  "Spain BO",
  "Italy Enterprise",
  "GESC",
  "Enterprise HOC",
  "EBU Back Office",
  "ESS",
  "EG Post",
  "Others"
];
const TSSE_SUBDEPT = [
  "--",
  "AD",
  "AO",
  "AT",
  "NEW-TA",
  "OIT",
  "OPC",
  "SEA-COE",
  "TES",
  "Others"
];
const HAS_SMC = [
  "UK",
  "UK Telesales",
  "IR",
  "IR Telesales",
  "GE",
  "Spain",
  "UK SMB",
  "IR SME"
];

/////////////////////////////////////////////////////////////////////////
export class SMCResignationDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastWorkDay: "",
      leaver: {},
      returnedHeadset: false,
      returnedKeys: false,
      returnedOhda: false,
      returnedLaptop: false,
      returnedMouse: false,
      returnedLaptopBag: false,
      deduct: '',
      comment: "",
      resignation: {},
      managerData: {}
    };

    this.checkStatus = this.checkStatus.bind(this);
    this.normalizeVal = this.normalizeVal.bind(this);
    this.submitButton = this.submitButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchLeaverInfo = this.fetchLeaverInfo.bind(this);
  }

  ///////////////////////////////////////////////
  componentDidMount() {
    const retDetail = this.props.location.state.detail;
    const smcData = retDetail.phase2;
    this.setState({
      returnedHeadset: smcData.returnedHeadset,
      returnedKeys: smcData.returnedKeys,
      returnedOhda: smcData.returnedOhda,
      deduct: smcData.deduct,
      comment: smcData.comment,
      lastWorkDay: retDetail.phase1.lastWorkDay,
      resignation: retDetail,
      managerData: {
        returnedHeadset: retDetail.phase1.returnedHeadset,
        returnedKeys: retDetail.phase1.returnedKeys,
        returnedOhda: retDetail.phase1.returnedOhda,
      }
    })

    this.fetchLeaverInfo(retDetail.staffId);
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

  mapValues(value) {
    if (value === 'true' || value === "on" || value === true) {
      return "Yes";
    }
    else if (value === "") {
      return "N/A";
    }
    else if (value === 'false' || value === "off" || value === false) {
      return "No";
    }
    else {
      return value
    }
  }

  ///////////////////////////////////////////////

  checkStatus(condX, condY, condZ) {
    // check confition after adding N/A
    if ((condX === true || condX === "") && (condY === true || condY === "") && (condZ === true || condZ === "")) {
      return DONE;
    } else {
      return PENDING;
    }
  }

  ///////////////////////////////////////////////
  handleChange(event) {
    let state = {};
    state[event.target.id] = this.normalizeVal(event.target.value);
    this.setState(state);
  }

  ///////////////////////////////////////////////
  fetchLeaverInfo(searchId) {

    let QUERY = "/users/?id=" + searchId;

    fetch(API + QUERY, {
      method: "get",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          leaver: data
        })
      })
      .catch((err) => {
        if (err)
          throw err;
      })

  }

  ///////////////////////////////////////////////
  submitButton(event) {
    event.preventDefault();
    let phase2 = {
      returnedHeadset: this.state.returnedHeadset,
      returnedKeys: this.state.returnedKeys,
      returnedOhda: this.state.returnedOhda,
      deduct: this.state.deduct,
      comment: this.state.comment,
      status: this.checkStatus(
        this.state.returnedHeadset,
        this.state.returnedKeys,
        this.state.returnedOhda
      )
    };

    fetch(API + ROUTE, {
      method: "post",
      body: JSON.stringify({
        staffId: this.state.leaver.staffId,
        phase2: phase2
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("SMC data submitted");
        }
        else if (response.status === 503) {
          toast.error("Error in db");
        }
        else {
          toast.error("Data cannot be submitted");
          return undefined;
        }
      })
      .catch(err => {
        throw err;
      });
  }

  /////////////////////////////////////////////////////////////////////////
  render() {
    const { leaver } = this.state;

    return (
      <Container fluid className="bg-light p-5">
        <ToastContainer />
        <div className='row'>
          <div className='offset-md-3 col-md-6 border bg-white rounded p-5'>
            <LeaverDetails leaverDetail={{ leaverInfo: leaver, lastDay: this.state.lastWorkDay }} />
            <hr />
            <Row className='p-5'>
              <Col></Col>
              <Col>
                <Header as='h3'>Team Leader Checklist</Header>
              </Col>
              <Col>
                <Header as='h3'>SMC Team Checklist</Header>
              </Col>
            </Row>
            <Form className='pl-5 pr-5'>
              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label className='font-weight-bold'>Returned Headset</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      className='border rounded pl-2'
                      readOnly
                      plaintext
                      value={this.mapValues(this.state.managerData.returnedHeadset)}
                    />
                  </Col>
                  <Col>
                    <select
                      id='returnedHeadset'
                      onChange={this.handleChange}
                      className='form-control'
                      value={this.state.returnedHeadset}>
                      <option value='confirmed'>Confirmed</option>
                      <option value='pending'>Pending</option>
                      <option value='not-delivered'>Not-Delivered</option>
                    </select>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col>
                    <Form.Label className='font-weight-bold'>Returned Keys</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      className='border rounded pl-2'
                      readOnly
                      plaintext
                      value={this.mapValues(this.state.managerData.returnedKeys)}
                    />
                  </Col>
                  <Col>
                    <select
                      id="returnedKeys"
                      onChange={this.handleChange}
                      className='form-control'
                      value={this.state.returnedKeys}>
                      <option value='confirmed'>Confirmed</option>
                      <option value='pending'>Pending</option>
                      <option value='not-delivered'>Not-Delivered</option>
                    </select>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col>
                    <Form.Label className='font-weight-bold'>Returned Laptop</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      className='border rounded pl-2'
                      readOnly
                      plaintext
                      value={this.mapValues(this.state.managerData.returnedKeys)}
                    />
                  </Col>
                  <Col>
                    <select
                      id="returnedKeys"
                      onChange={this.handleChange}
                      className='form-control'
                      value={this.state.returnedLaptop}>
                      <option value='confirmed'>Confirmed</option>
                      <option value='pending'>Pending</option>
                      <option value='not-delivered'>Not-Delivered</option>
                    </select>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col>
                    <Form.Label className='font-weight-bold'>Returned Mouse</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      className='border rounded pl-2'
                      readOnly
                      plaintext
                      value={this.mapValues(this.state.managerData.returnedKeys)}
                    />
                  </Col>
                  <Col>
                    <select
                      id="returnedKeys"
                      onChange={this.handleChange}
                      className='form-control'
                      value={this.state.returnedMouse}>
                      <option value='confirmed'>Confirmed</option>
                      <option value='pending'>Pending</option>
                      <option value='not-delivered'>Not-Delivered</option>
                    </select>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col>
                    <Form.Label className='font-weight-bold'>Returned Laptop Bag</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      className='border rounded pl-2'
                      readOnly
                      plaintext
                      value={this.mapValues(this.state.managerData.returnedKeys)}
                    />
                  </Col>
                  <Col>
                    <select
                      id="returnedKeys"
                      onChange={this.handleChange}
                      className='form-control'
                      value={this.state.returnedLaptopBag}>
                      <option value='confirmed'>Confirmed</option>
                      <option value='pending'>Pending</option>
                      <option value='not-delivered'>Not-Delivered</option>
                    </select>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
            <Button
              size='lg'
              type='submit'
              block
              className='mt-5'
              variant='danger'
              onClick={this.submitButton}
            >Submit</Button>
          </div>
        </div>
      </Container>
    );
  }
}
