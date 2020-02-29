import React from "react";
import {
  LeaverDetails
} from "../components";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";

/////////////////////////////////////////////////////////////////////////
const API = "/api";
const ROUTE = "/resignations/update/phase2";
const DONE = "done";
const PENDING = "pending";

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

  mapValues(value){
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
      <div className="container mt-5">
        <ToastContainer />
        <div className='p-2'>
          <LeaverDetails leaverDetail={{ leaverInfo: leaver, lastDay: this.state.lastWorkDay }} />
        </div>
        <div>
          <header className='text-center'>
              <hr />
              <h3>Team Leader Checklist</h3>
              <hr />
          </header>
          <Form className='mt-4 border p-5'>
              <Form.Group>
                  <Row>
                      <Col>
                          <Form.Label className="font-weight-bold">Returned Headset</Form.Label>
                      </Col>
                      <Col>
                          <Form.Control
                              readOnly
                              plaintext
                              value={this.mapValues(this.state.managerData.returnedHeadset)}
                          />
                      </Col>
                  </Row>
                  <hr />
                  <Row>
                      <Col>
                          <Form.Label className="font-weight-bold">Returned Keys</Form.Label>
                      </Col>
                      <Col>
                          <Form.Control
                              readOnly
                              plaintext
                              value={this.mapValues(this.state.managerData.returnedKeys)}
                          />
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col>
                          <Form.Label className="font-weight-bold">Returned Custody</Form.Label>
                      </Col>
                      <Col>
                          <Form.Control
                              readOnly
                              plaintext
                              value={this.mapValues(this.state.managerData.returnedOhda)}
                          />
                      </Col>
                  </Row>
              </Form.Group>
          </Form>
        </div>
        <div>
          <header className='text-center'>
                <hr />
                <h3>SMC Team Checklist</h3>
                <hr />
            </header>
          <Form className='mt-4 border p-5'>
            <Form.Group className=''>
              <Row>
                <Col>
                  <Form.Label className='col-form-group font-weight-bold'>Returned Headset</Form.Label>
                </Col>
                <Col>
                  <select
                    id="returnedHeadset"
                    onChange={this.handleChange}
                    className="form-control"
                    value={this.state.returnedHeadset}>
                    <option value={""}> N/A </option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </Col>
              </Row>
              <Row className = 'mt-3'>
                <Col>
                  <Form.Label className='col-form-group font-weight-bold'>Returned Keys</Form.Label>
                </Col>
                <Col>
                  <select
                    id="returnedKeys"
                    onChange={this.handleChange}
                    className="form-control"
                    value={this.state.returnedKeys}>
                    <option value={""}> N/A </option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </Col>
              </Row>
              <Row className = 'mt-3'>
                <Col>
                  <Form.Label className='col-form-group font-weight-bold'>Returned Ohda</Form.Label>
                </Col>
                <Col>
                  <select
                    id="returnedOhda"
                    onChange={this.handleChange}
                    className="form-control"
                    value={this.state.returnedOhda}>
                    <option value={""}> N/A </option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </Col>
              </Row>
              <Row className = 'mt-3'>
                <Col>
                  <Form.Label className='col-form-group font-weight-bold'>Amount Deducted</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                      id='deduct'
                      className='col-xs-1'
                      as='textarea'
                      rows='1'
                      onChange={this.handleChange}
                    />
                </Col>
              </Row>
              <Row className = 'mt-3'>
                <Col>
                  <Form.Label className='col-form-group font-weight-bold'>Comments</Form.Label>
                </Col>
                <Col>
                  <textarea
                    id="comment"
                    rows="5"
                    onChange={this.handleChange}
                    className="p-2 form-control"
                    value={this.state.comment} />
                </Col>
              </Row>
              <Row className = 'mt-5'>
                <Col>
                  <Button
                    size='lg'
                    type='submit'
                    block
                    variant='danger'
                    onClick={this.submitButton}
                  >Submit
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
          <br/>
          <br/>
          <br/>
        </div>
      </div>
    );
  }
}
