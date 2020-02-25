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
      deduct: this.props.location.state.detail.phase2.deduct,
      comment: ""
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
      lastWorkDay: retDetail.phase1.lastWorkDay
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

  ///////////////////////////////////////////////
  checkStatus(condX, condY, condZ, condA) {
    // check confition after adding N/A
    if ((condX === true || condX === "") && (condY === true || condY === "") && (condZ === true || condZ === "") && (condA === true || condA === "")) {
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
        this.state.returnedOhda,
        this.state.deduct
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
        <Form className='p-2'>
          <Form.Group className='p-5 border'>
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
                <Form.Label className='col-form-group font-weight-bold'>Deduct</Form.Label>
              </Col>
              <Col>
                <input
                  id="deduct"
                  type="checkbox"
                  defaultChecked={this.state.deduct}
                  onChange={(e) => {
                    this.handleChange({
                      target: {
                        id: e.target.id,
                        value: e.target.checked,
                      },
                    });
                  }}
                  className="form-control" />
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
      </div>
    );
  }
}
