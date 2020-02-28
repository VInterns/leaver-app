import React from "react";
import {
  LeaverDetails
} from "../components";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/////////////////////////////////////////////////////////////////////////
const API = "/api";
const ROUTE = "/resignations/update/phase7";
const DONE = "done";
const PENDING = "pending";

/////////////////////////////////////////////////////////////////////////
export class SHTViewScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resignationDetails: {},
      leaver: {},
      returnedHwToken: false,
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
    const retResignation = this.props.location.state.resDetails;

    this.setState({
      resignationDetails: retResignation,
      comment: retResignation.phase7.comment,
      returnedHwToken: retResignation.phase7.returnedHwToken
    });

    this.fetchLeaverInfo(retResignation.staffId);

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

  checkStatus(condX) {
    // check confition after adding N/A
    if ((condX === true || condX === "")) {
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

    let phase7 = {
      returnedHwToken: this.state.returnedHwToken,
      comment: this.state.comment,
      status: this.checkStatus(this.state.returnedHwToken)
    };

    fetch(API + ROUTE, {
      method: "post",
      body: JSON.stringify({
        staffId: this.state.resignationDetails.staffId,
        phase7: phase7
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Data Sent");
        }
        else if (response.status === 503) {
          toast.error("Error in db");
        }
        else {
          toast.error("Data cannot be updated");
          return undefined;
        }
      })
      .catch(err => {
        throw err;
      });
  }

  /////////////////////////////////////////////////////////////////////////
  render() {
    const { resignationDetails, leaver } = this.state;
    const phase1 = Object(resignationDetails.phase1);

    return (
      <div className="container mt-5">
        <ToastContainer />
        <div className='p-2'>
          <LeaverDetails leaverDetail={{ leaverInfo: leaver, lastDay: phase1.lastWorkDay }} />
        </div>
        <Form className='p-2'>
          <Form.Group className='p-5 border'>
            <Row>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>Returned Hardware Token</Form.Label>
              </Col>
              <Col>
                <select
                  id="returnedHwToken"
                  onChange={this.handleChange}
                  className="form-control"
                  value={this.state.returnedHwToken}>
                  <option value={""}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>Comments</Form.Label>
              </Col>
              <Col>
                <textarea
                  id="comment"
                  rows="5"
                  onChange={this.handleChange}
                  className="form-control"
                  value={this.state.comment} />
              </Col>
            </Row>
            <Row className='mt-5'>
              <Col>
                <Button
                  size='lg'
                  type='submit'
                  block
                  variant='danger'
                  onClick={this.submitButton}
                >
                  Submit
            </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
