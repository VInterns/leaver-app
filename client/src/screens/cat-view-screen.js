import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { LeaverDetails } from '../components';
import { Form, Row, Col, Image, Button } from 'react-bootstrap';

/////////////////////////////////////////////////////////////////////////
var phoneBilledAmount = 'yes';
const DONE = "done";
const PENDING = "pending";
/////////////////////////////////////////////////////////////////////////
export class CCConsumerActivation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
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
          Data: data
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
    var files = event.target.files;
    this.setState({
      selectedFile: files
    });
  };

  ///////////////////////////////////////////////
  checkStatus(condX, condY) {
    // check confition after adding N/A
    if ((condX === true || condX === "" ||condX === "yes") && (condY === true || condY === "" || condY === "yes")) {
      return DONE;
    } else {
      return PENDING;
    }
  }
  checkRequestStatus(resignation) {
    if (
      resignation.phase2.status === 'new' &&
      resignation.phase3.status === 'new' &&
      resignation.phase4.status === 'new' &&
      resignation.phase5.status === 'new' &&
      resignation.phase6.status === 'new' &&
      resignation.phase7.status === 'new' &&
      resignation.phase8.status === 'new'
    ) {
      return 'new';
    } else if (
      resignation.phase2.status === 'done' &&
      resignation.phase3.status === 'done' &&
      resignation.phase4.status === 'done' &&
      resignation.phase5.status === 'done' &&
      resignation.phase6.status === 'done' &&
      resignation.phase7.status === 'done' &&
      resignation.phase8.status === 'done' 
    ) {
      return 'done';
    } else {
      return 'pending';
    }
  }

  clickSubmit(e) {
    e.preventDefault();

    if (this.inputRatePlan.value === '' || this.inputComment.value === '') {
      toast.error('Please fill all empty slots and try again');
      this.inputRatePlan.value = '';
      this.inputComment.value = '';
      phoneBilledAmount = 'yes';
      return;
    }
    let phaseStatus = this.checkStatus(this.inputRatePlan.value,phoneBilledAmount);
    this.setState({Data: {...this.Data,
                          phase4:{
                            ...this.phase4,
                            status : phaseStatus
                          }
                          }
                  })
    let params = this.props.match.params;
    let id = params.staffId;
    var url2 = '/api/resignations/data?id=' + id;

    fetch(url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        ratePlan: this.inputRatePlan.value,
        comment: this.inputComment.value,
        phoneBilledAmount: phoneBilledAmount,
        nationalId: this.state.nationalId,
        status: this.checkRequestStatus(this.state.Data)
      })
    })
      .then(response => {
        toast.success('Data successfully updated');
        //this.props.history.push('/cc-consumer-activation-table')
      })
      .catch(function(error) {
        toast.error('Upload Fail');
      });
  }

  ///////////////////////////////////////////////
  //DROP DOWN(phone Billed Amount) change value
  getVal(sel) {
    phoneBilledAmount = sel.target.value;
  }

  ///////////////////////////////////////////////
  imageUploaderHandler = file => {
    this.setState({
      nationalId: {
        fileName: file.name,
        dataURL: file.dataURL,
        type: file.type,
        size: file.size
      }
    });
  };

  ///////////////////////////////////////////////
  render() {
    const { Data } = this.state;
    const Phase1 = Object(Data.phase1);
    const NationalIDImg = Object(Phase1.nationalIdImg);
    return (
      <div className='container mt-5'>
        <div className='p-2'>
          <LeaverDetails
            leaverDetail={{
              leaverInfo: this.state.leaver,
              lastDay: this.state.lastWorkDay
            }}
          />
        </div>
        <ToastContainer />
        <Form className='p-2'>
          <Form.Group className='p-5 border'>
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
            <Row className='mt-3'>
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
                  id='rateplan'
                  ref={inRatePlan => (this.inputRatePlan = inRatePlan)}
                  placeholder='Enter Rate Plan'
                />
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Has Phone Billed Amount
                </Form.Label>
              </Col>
              <Col style={{ marginTop: '10px' }}>
                <select className='form-control' onChange={this.getVal}>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                  <option value='N/A'>N/A</option>
                </select>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Comments
                </Form.Label>
              </Col>
              <Col style={{ marginTop: '10px' }}>
                <textarea
                  className='form-control'
                  type='textarea'
                  id='comment'
                  ref={inComment => (this.inputComment = inComment)}
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
    );
  }
}
