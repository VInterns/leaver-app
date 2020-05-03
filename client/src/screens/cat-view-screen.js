import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { LeaverDetails } from '../components';
import { Form, Row, Col, Image, Button } from 'react-bootstrap';
import { Container } from 'semantic-ui-react';

/////////////////////////////////////////////////////////////////////////
const DONE = "done";
const PENDING = "pending";
/////////////////////////////////////////////////////////////////////////
export class CCConsumerActivation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
      ratePlan: '',
      comment: '',
      phoneBilledAmount: false,
      lastWorkDay: '',
      nationalId: null,
      phaseStatus: '',
      leaver: {}
    };
    this.clickSubmit = this.clickSubmit.bind(this);
    this.checkRequestStatus = this.checkRequestStatus.bind(this);
  }

  ///////////////////////////////////////////////
  //fetch data for the employee resignation form
  getData() {
    //let url = this.props.location.search;
    let params = this.props.match.params;

    let id = params.staffId;
    this.setState({
      lastWorkDay: params.lastWorkDay
    });

    if (id === undefined) {
      this.props.history.push('cc-consumer-activation-table');
    }

    // Employee Details
    let url = '/api/users/?id=' + id;
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          leaver: data
        });
      })
      .catch(err => {
        if (err) throw err;
      });

    // Resignation Details
    var url2 = '/api/resignations/' + id;
    fetch(url2, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          Data: data,
          ratePlan: data.phase4.ratePlan,
          comment: data.phase4.comment,
          phoneBilledAmount: data.phase4.phoneBilledAmount
        });
      })
      .catch(err => {
        throw err;
      });
  }

  ///////////////////////////////////////////////
  componentDidMount() {
    this.getData();
  }

  ///////////////////////////////////////////////
  //on click on choose file
  onChangeHandler = event => {
    let state = {};
    state[event.target.id] = this.normalizeVal(event.target.value);
    this.setState(state);
  };

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

  checkStatus(condX, condY) {
    // check confition after adding N/A
    if ((condX !== "") && (condY === true || condY === "" || condY === "yes")) {
      return DONE;
    } else {
      return PENDING;
    }
  }
  checkRequestStatus(resignation, currentphaseStatus) {
    if (
      resignation.phase3.status === 'new' &&
      resignation.phase6.status === 'new' &&
      resignation.phase7.status === 'new' &&
      resignation.phase8.status === 'new' &&
      currentphaseStatus === 'new'
    ) {
      return 'new';
    } else if (
      resignation.phase3.status === 'done' &&
      resignation.phase6.status === 'done' &&
      resignation.phase7.status === 'done' &&
      resignation.phase8.status === 'done' &&
      currentphaseStatus === 'done'
    ) {
      return 'done';
    } else {
      return 'pending';
    }
  }

  clickSubmit(e) {
    e.preventDefault();

    let params = this.props.match.params;
    let id = params.staffId;
    var url2 = '/api/resignations/data?id=' + id;

    let phaseStatus = this.checkStatus(this.state.ratePlan, this.state.phoneBilledAmount);
    let phase4 = {
      ratePlan: this.state.ratePlan,
      comment: this.state.comment,
      phoneBilledAmount: this.normalizeVal(this.state.phoneBilledAmount),
      status: phaseStatus
    }
    fetch(url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phase4: phase4,
        status: this.checkRequestStatus(this.state.Data, phaseStatus)
      })
    })
      .then(response => {
        toast.success('Data successfully updated');
        //this.props.history.push('/cc-consumer-activation-table')
      })
      .catch(function (error) {
        toast.error('Upload Fail');
      });
  }

  ///////////////////////////////////////////////
  render() {
    const { Data, leaver } = this.state;
    const Phase1 = Object(Data.phase1);
    const NationalIDImg = Object(Phase1.nationalIdImg);
    return (
      <Container fluid className='bg-light p-5' style={{ height: '130vh' }}>
        <ToastContainer />
        <div className='row'>
          <div className='offset-md-3 col-md-6 border bg-white rounded p-5'>
            <LeaverDetails leaverDetail={{ leaverInfo: { ...leaver, mobile: Phase1.mobile }, lastDay: this.state.lastWorkDay }} />
            <hr />
            <Form>
              <Form.Group className='p-5'>
                <Row>
                  <Col>
                    <Form.Label className='col-form-group font-weight-bold'>
                      National ID
                </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control plaintext readOnly value={Phase1.nationalId} />
                  </Col>
                </Row>
                {NationalIDImg.dataURL && <Row className='mt-3'>
                  <Col>
                    <Form.Label className='col-form-group font-weight-bold'>
                      Copy of National ID
                </Form.Label>
                  </Col>
                  <Col>
                    <Image
                      alt={NationalIDImg.fileName}
                      src={NationalIDImg.dataURL}
                    />
                  </Col>
                </Row>
                }
                <Row className='mt-3'>
                  <Col>
                    <Form.Label className='col-form-group font-weight-bold'>
                      Rate Plan
                </Form.Label>
                  </Col>
                  <Col style={{ marginTop: '10px' }}>
                    <input
                      className='form-control'
                      type='text'
                      id='ratePlan'
                      value={this.state.ratePlan}
                      onChange={this.onChangeHandler}
                    />
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col>
                    <Form.Label className='col-form-group font-weight-bold'>
                      Has Phone Billed Amount
                    </Form.Label>
                  </Col>
                  <Col>
                    <select
                      id='phoneBilledAmount'
                      className='form-control'
                      value={this.state.phoneBilledAmount}
                      onChange={this.onChangeHandler}
                    >
                      <option value={""}> N/A </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col>
                    <Form.Label className='col-form-group font-weight-bold'>
                      Comments
                </Form.Label>
                  </Col>
                  <Col>
                    <textarea
                      className='form-control'
                      type='textarea'
                      id='comment'
                      value={this.state.comment}
                      onChange={this.onChangeHandler}
                      placeholder='Input Comment here'
                    />
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col>
                    <Button
                      size='lg'
                      type='submit'
                      block
                      variant='danger'
                      onClick={this.clickSubmit}
                    >
                      Submit
                </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </div>
        </div>
      </Container>
    );
  }
}
