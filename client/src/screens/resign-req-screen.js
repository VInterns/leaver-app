// to do -> redirect after Submit
import React, { Component } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { confirmAlert, onClose } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { ImageUploaderComponent } from '../components';

const API = '/api/';
const SEARCH = 'users/search';
const SUBMIT = 'resignations/';

export class ResignReqScreen extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      className: 'text-danger'
    });
    this.state = {
      staffId: '',
      returnedHeadset: false,
      returnedKeys: false,
      returnedOhda: false,
      sickLeave: false,
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
      createdby: this.props.createdby,
      employeeFound: false
    };
  }

  static mapStateToProps(state) {
    return {
      createdby: state.auth.username
    };
  }

  /* Added to fetch MailList */
  componentDidMount() {
    // this.fetchMailList();
  }

  onSearch = e => {
    e.preventDefault();
    fetch(API + SEARCH, {
      body: JSON.stringify({ staffId: this.state.staffId }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({ employeeFound: true });
          return response.json();
        } else {
          toast.error('Employee not found');
          return undefined;
        }
      })
      .then(data => {
        if (data) {
          this.setState({ staffId: data.staffId });
          this.setState({ sapStaffId: data.staffId });
          this.setState({ name: data.name });
          this.setState({ managerName: data.managerName });
          this.setState({ ntAccount: data.ntAccount });
          this.setState({ department: data.department });
          this.setState({ careCenter: data.careCenter });
          this.setState({ jobTitle: data.jobTitle });
          this.setState({ hiringDate: data.hiringDate });
          this.setState({ mobile: data.mobile });
          this.setState({ username: data.username });
          this.setState({ nationalId: data.nationalId });
        }
      });
  };

  onSubmit = () => {
    if (this.validator.allValid()) {
      fetch(API + SUBMIT, {
        body: JSON.stringify({
          staffId: this.state.staffId,
          managerName: this.state.managerName,
          name: this.state.name,
          createdby: this.state.createdby,
          status: 'new',
          phase1: {
            status: 'done',
            personalMobile: this.state.personalMobile,
            recommended: this.state.recommended,
            returnedHeadset: this.state.returnedHeadset,
            returnedKeys: this.state.returnedKeys,
            returnedOhda: this.state.returnedOhda,
            ohdaType: this.state.ohdaType,
            lastWorkDay: this.state.lastWorkDay,
            nationalId: this.state.nationalId,
            nationalIdImg: this.state.nationalIdImg,
            annualsGranted: this.state.annualsGranted,
            annualsTaken: this.state.annualsTaken,
            noShow: this.state.noShow,
            lostHours: this.state.lostHours,
            daysToTake: this.state.daysToTake,
            iex: this.state.iex
          },
          phase2: {

            status: 'new',
            returnedHeadset: this.state.returnedHeadset,
            returnedKeys: this.state.returnedKeys,
            returnedOhda: this.state.returnedOhda,
            deduct: false,
            comment: ''
          },
          phase3: {
            status: 'new',
            annualsGranted: this.state.annualsGranted,
            annualsTaken: this.state.annualsTaken,
            noShow: this.state.noShow,
            lostHours: this.state.lostHours,
            daysToTake: this.state.daysToTake,
            iex: this.state.iex
          },
          phase4: {
            status: 'new',
            ratePlan:'',
            comment:'',
            phoneBilledAmount:false
          },
          phase5: {
            status: 'new',
            comment: ''
          },
          phase6: {
            status: 'new',
            disabledSecureId: false,
            disabledRemedyAccount: false,
            disabledAccountsInProductionSystems: false,
            comment: ''
          },
          phase7: {
            status: 'new',
            comment: '',
            returnedHwToken: false
          },
          phase8: {
            status: 'new',
            disabledAccount: false,
            physicalId: false,
            comment: ''
          }
        }),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      }).then(response => {
        if (response.status === 200) {
          toast.success('Resignation Request Recieved');
        } else if (response.status === 503) {
          toast.error('Error in db');
        } else {
          toast.error('Resigation already exists');
        }
      });
    } else {
      toast.error('Please enter all required fields');
    }
  };

  submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to submit this resignation request?',
      buttons: [
        {
          label: 'Yes',
          onClick: this.onSubmit
        },
        {
          label: 'No',
          onClick: onClose
        }
      ]
    });
  };

  ///////////////////////////////////////////////
  normalizeVal(value) {
    if (value === 'true' || value === 'on' || value === 'Yes') {
      return true;
    } else if (value === '') {
      return '';
    } else if (value === 'false' || value === 'off' || value === 'No') {
      return false;
    } else {
      return value;
    }
  }
  ///////////////////////////////////////////////

  handleChange = e => {
    this.setState({ [e.target.name]: this.normalizeVal(e.target.value) });
  };
  ///////////////////////////////////////////////
  imageUploaderHandler = file => {
    this.setState({
      nationalIdImg: {
        fileName: file.name,
        dataURL: file.dataURL,
        type: file.type,
        size: file.size
      }
    });
  };

  render() {
    this.validator.purgeFields();
    return (
      <Container className='p-5'>
        <h3 className='text-center'>Resignation Request</h3>
        <ToastContainer />
        <Form className='mt-4'>
          <Form.Group className='p-5 border'>
            <Form.Group className='p-2 border border-danger'>
              <Row>
                <Col>
                  <Form.Label className='col-form-group font-weight-bold'>
                    Staff ID
                    <span style={{ color: 'red', fontSize: 25 }}>*</span>
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    name='staffId'
                    id='id'
                    placeholder='12345'
                    className='form-control'
                    onChange={this.handleChange}
                    onBlur={() => this.validator.showMessageFor('staff id')}
                  />
                  {this.validator.message(
                    'staff id',
                    this.state.staffId,
                    'required'
                  )}
                </Col>
                <Col>
                  <Button
                    type='button'
                    variant='danger'
                    onClick={this.onSearch}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Row>
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
            <Row>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Employee Name
                </Form.Label>
              </Col>
              <Col>
                <Form.Control plaintext readOnly value={this.state.name} />
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Manager Name
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  value={this.state.managerName}
                />
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  NT Account
                </Form.Label>
              </Col>
              <Col>
                <Form.Control plaintext readOnly value={this.state.ntAccount} />
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Department
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  value={this.state.department}
                />
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Cost Center
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  value={this.state.careCenter}
                />
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Job Title
                </Form.Label>
              </Col>
              <Col>
                <Form.Control plaintext readOnly value={this.state.jobTitle} />
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Hiring Date
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  value={this.state.hiringDate}
                />
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Mobile Number
                </Form.Label>
              </Col>
              <Col>
                <Form.Control plaintext readOnly value={this.state.mobile} />
              </Col>
              <Col></Col>
            </Row>
            <Row className='mt-3'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Last Working Day
                  <span style={{ color: 'red', fontSize: 25 }}>*</span>
                </Form.Label>
              </Col>
              <Col>
                <input
                  type='date'
                  id='last'
                  name='lastWorkDay'
                  min='2018-01-01'
                  max='2060-12-31'
                  onChange={this.handleChange}
                  onBlur={() =>
                    this.validator.showMessageFor('last working day')
                  }
                ></input>
                {this.validator.message(
                  'last working day',
                  this.state.lastWorkDay,
                  'required'
                )}
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Personal Mobile Number
                  <span style={{ color: 'red', fontSize: 25 }}>*</span>
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as='textarea'
                  rows='1'
                  name='personalMobile'
                  onChange={this.handleChange}
                  onBlur={() =>
                    this.validator.showMessageFor('Personal Mobile')
                  }
                />
                {this.validator.message(
                  'Personal Mobile',
                  this.state.personalMobile,
                  'required|phone|size:11'
                )}
              </Col>
              <Col></Col>
            </Row>
            <Row className='mt-3'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Recommended to join Vodafone future projects
                  <span style={{ color: 'red', fontSize: 25 }}>*</span>
                </Form.Label>
              </Col>
              <Col>
                <input
                  name='recommended'
                  type='checkbox'
                  defaultChecked={this.state.recommended}
                  onChange={this.handleChange}
                  className='p-2 form-control col-sm-1 text-center'
                />
              </Col>
              <Col></Col>
            </Row>
          </Form.Group>
          <Form.Group className='p-5 border'>
            <Row required>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Returned Headset
                  <span style={{ color: 'red', fontSize: 25 }}>*</span>
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as='select'
                  name='returnedHeadset'
                  onChange={this.handleChange}
                  defaultValue={this.state.returnedHeadset}
                >
                  <option value={''}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Returned Keys
                  <span style={{ color: 'red', fontSize: 25 }}>*</span>
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as='select'
                  name='returnedKeys'
                  onChange={this.handleChange}
                  defaultValue={this.state.returnedKeys}
                >
                  <option value={''}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Returned Custody
                  <span style={{ color: 'red', fontSize: 25 }}>*</span>
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as='select'
                  name='returnedOhda'
                  onChange={this.handleChange}
                  defaultValue={this.state.returnedOhda}
                >
                  <option value={''}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Custody Type
                  <span style={{ color: 'red', fontSize: 25 }}>*</span>
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as='textarea'
                  rows='1'
                  name='ohdaType'
                  onChange={this.handleChange}
                  onBlur={() => this.validator.showMessageFor('Custody Type')}
                />
                {this.validator.message(
                  'Custody Type',
                  this.state.ohdaType,
                  'required|alpha_num_space'
                )}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className='p-5 border form-group'>
            <Row>
              <Col>
                <Form.Label className='d-flex justify-content-center h4 font-weight-bold'>
                  Leave Balance
                </Form.Label>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  IEX
                </Form.Label>
                <Form.Control
                  className='col-xs-1 w-25'
                  as='textarea'
                  rows='1'
                  name='iex'
                  onChange={this.handleChange}
                  onBlur={() => this.validator.showMessageFor('iex')}
                />
                {this.validator.message('iex', this.state.iex, 'required')}
              </Col>
            </Row>
            <table className='table mt-3'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>Annuals Granted</th>
                  <th scope='col'>Annuals Taken</th>
                  <th scope='col'>No Show</th>
                  <th scope='col'>Lost Hours</th>
                  <th scope='col'>In Lieu Days to Take</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>
                    <Form.Control
                      as='textarea'
                      rows='1'
                      name='annualsGranted'
                      onChange={this.handleChange}
                    />
                  </th>
                  <td>
                    <Form.Control
                      as='textarea'
                      rows='1'
                      name='annualsTaken'
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <Form.Control
                      as='textarea'
                      rows='1'
                      name='noShow'
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <Form.Control
                      as='textarea'
                      rows='1'
                      name='lostHours'
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <Form.Control
                      as='textarea'
                      rows='1'
                      name='daysToTake'
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Row className='mt-3'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Pending Sick Leave
                  <span style={{ color: 'red', fontSize: 25 }}>*</span>
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as='select'
                  name='sickLeave'
                  onChange={this.handleChange}
                  defaultValue={this.state.sickLeave}
                >
                  <option value={''}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className='p-5 border'>
            <Row>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  National ID Number
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  value={this.state.nationalId}
                />
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Copy of National ID Front Page
                </Form.Label>
              </Col>
              <Col>
                <ImageUploaderComponent
                  fileAddHandler={this.imageUploaderHandler}
                />
              </Col>
            </Row>
          </Form.Group>
          <br />
          <Button
            // type='submit'
            variant='danger'
            size='lg'
            onClick={this.submit}
            block
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export const ConnectedResignScreen = connect(ResignReqScreen.mapStateToProps)(
  ResignReqScreen
);
