import React from 'react';
import {
  LeaverDetails
} from "../components";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/////////////////////////////////////////////////////////////////////////
const API = "/api";

/////////////////////////////////////////////////////////////////////////
export class ELTViewScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      entry: [],
      lastWorkDay: '',
      comment: "",
      resignation: {}
    };

    this.getEntry = this.getEntry.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  ///////////////////////////////////////////////
  getEntry(searchId) {

    let QUERY = "/users/?id=" + searchId;

    fetch(API + QUERY, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          entry: data
        })
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      })
  }
  ///////////////////////////////////////////////
  submit(e) {

    e.preventDefault();
    let phase5 = {
      comment: this.state.comment,
      status: "done"
    }

    fetch('/api/resignations/update/phase5', {
      method: 'post',
      body: JSON.stringify({
        staffId: this.props.history.location.state.resId,
        phase5: phase5
      }),
      headers: {
        'content-type': 'application/json'
      },
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

  ///////////////////////////////////////////////
  handleChange(e) {
    this.setState({ comment: e.target.value });
  }

  ///////////////////////////////////////////////
  componentDidMount() {

    // console.log(this.props.history.location.state.lastWorkDay)
    // let lastDay = this.props.history.location.state.lastWorkDay;
    let staffID = this.props.history.location.state.resId;
    let phase5Comment = this.props.history.location.state.comment;
    this.getEntry(staffID)
    this.setState({
      // lastWorkDay: lastDay,
      comment: phase5Comment,
      resignation : this.props.history.location.state.resignation

    })
  }

  ///////////////////////////////////////////////
  render() {

    const { entry } = this.state;

    return (
      <div className="container mt-5">
        <ToastContainer />
        <div className='p-2'>
          <LeaverDetails leaverDetail={{ leaverInfo: entry, lastDay: this.props.history.location.state.lastWorkDay }} />
        </div>
        <Form className='p-2'>
          <Form.Group className='p-5 border'>
            <Row>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>Comments</Form.Label>
              </Col>
              <Col>
                <textarea
                  id="comment"
                  rows="5"
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter your Comments"
                  value={this.state.comment || ""}
                />
              </Col>
            </Row>
            <Row className='mt-5'>
              <Col>
                <Button
                  size = 'lg'
                  type= 'submit'
                  block
                  variant = 'danger'
                  onClick={this.submit}
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