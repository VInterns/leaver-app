// to do -> redirect after Submit
import React, { Component } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';

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
      createdby: this.props.createdby
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
          return response.json();
        } else {
          toast.error('User not found');
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
        }
      });
  };

  onSubmit = e => {
    if (this.validator.allValid()) {
      e.preventDefault();
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
            nationalIdImg: this.state.nationalIdImg
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
          return undefined;
        }
      });

      // let QUERY = "mail/sendMail";

      // /* Append Employee Email */
      // this.state.mailList.push(this.state.username);

      // /* Send Email to mailList */
      // fetch(API + QUERY, {
      //   method: "post",
      //   body: JSON.stringify({
      //     mailList : this.state.mailList
      //   }),
      //   "headers": {"Content-type": "application/json"}
      // })
      // .then((res) => {
      //   return console.log(res);
      // })
      // .catch((err) => {
      //   return console.log(err);
      // });
    } else {
      toast.error('Please enter all required fields');
    }
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

  // fetchMailList(){
  //   let LIST_QUERY = "mail/getMailList";

  //     /* Fetch Mailing List */
  //     fetch(API + LIST_QUERY, {
  //       method: "get",
  //       headers: {"Content-type": "application/json"}
  //     })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((list) => {
  //       this.setState({
  //         mailList: list
  //       })
  //     })
  //     .catch((err) => {
  //       throw err;
  //     })
  // }

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
      <Container>
        <br />
        <h3>Resignation Request</h3>
        <br />
        <ToastContainer />
        <Form>
          <Form.Group>
            <Form.Group className='p-2 border border-danger'>
              <Row>
                <Col>
                  <Form.Label>Staff ID</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    name='staffId'
                    id='id'
                    placeholder='12345'
                    className='form-control'
                    onChange={this.handleChange}
                  />
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
                <Form.Label className='col-form-label'>SAP Staff ID</Form.Label>
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
                <Form.Label>Employee Name</Form.Label>
              </Col>
              <Col>
                <Form.Control plaintext readOnly value={this.state.name} />
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Manager Name</Form.Label>
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
                <Form.Label>NT Account</Form.Label>
              </Col>
              <Col>
                <Form.Control plaintext readOnly value={this.state.ntAccount} />
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Department</Form.Label>
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
                <Form.Label>Care Center</Form.Label>
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
                <Form.Label>Job Title</Form.Label>
              </Col>
              <Col>
                <Form.Control plaintext readOnly value={this.state.jobTitle} />
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Hiring Date</Form.Label>
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
                <Form.Label>Mobile Number*</Form.Label>
              </Col>
              <Col>
                <Form.Control plaintext readOnly value={this.state.mobile} />
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Personal Mobile Number*</Form.Label>
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
            <Row>
              <Col>
                <Form.Label>Recommended*</Form.Label>
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
          <Form.Group className='p-2 border border-danger'>
            <Row required>
              <Col>
                <Form.Label>Returned Headset</Form.Label>
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
            <Row>
              <Col>
                <Form.Label>Returned Keys</Form.Label>
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
            <Row>
              <Col>
                <Form.Label> Pending Sick Leave</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as='select'
                  name='sickLeave'
                  onChange={this.handleChange}
                  defaultValue={this.state.sickLeave}
                  onBlur={() =>
                    this.validator.showMessageFor('Pending Sick Leave')
                  }
                >
                  <option value={''}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
                {this.validator.message(
                  'Pending Sick Leave',
                  this.state.returnedOhda,
                  'required'
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Returned Custody</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as='select'
                  name='returnedOhda'
                  onChange={this.handleChange}
                  defaultValue={this.state.returnedOhda}
                  onBlur={() =>
                    this.validator.showMessageFor('Returned Custody')
                  }
                >
                  <option value={''}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
                {this.validator.message(
                  'Returned Custody',
                  this.state.returnedOhda,
                  'required'
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Custody Type</Form.Label>
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
                  'required|alpha'
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Last Working Day*</Form.Label>
              </Col>
              <Col>
                <input
                  type='date'
                  id='last'
                  name='lastWorkDay'
                  min='2018-01-01'
                  max='2026-12-31'
                  onChange={this.handleChange}
                  onBlur={() =>
                    this.validator.showMessageFor('last working day')
                  }
                ></input>
                {this.validator.message(
                  'last working day',
                  this.state.personalMobile,
                  'required'
                )}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className='p-2 border border-danger form-group'>
            <Row>
              <Col>
                <Form.Label className='d-flex justify-content-center h4'>
                  Leave Balance
                </Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>IEX</Form.Label>
              </Col>
              <Col className='col-xs-2'>
                <Form.Control
                  as='textarea'
                  rows='1'
                  name='iex'
                  onChange={this.handleChange}
                  onBlur={() => this.validator.showMessageFor('iex')}
                />
                {this.validator.message('iex', this.state.iex, 'required')}
              </Col>
            </Row>
            <table className='table'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>Annuals Granted</th>
                  <th scope='col'>Annuals Taken</th>
                  <th scope='col'>No Show</th>
                  <th scope='col'>Lost Hours</th>
                  <th scope='col'>In Lieu days to take</th>
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
          </Form.Group>
          <Form.Group className='p-2 border border-danger'>
            <Row>
              <Col>
                <Form.Label>National ID Number*</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as='textarea'
                  rows='1'
                  name='nationalId'
                  onChange={this.handleChange}
                  onBlur={() => this.validator.showMessageFor('national id')}
                />
                {this.validator.message(
                  'national id',
                  this.state.nationalId,
                  'required|integer|size:14'
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Copy of National ID Front Page</Form.Label>
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
            type='submit'
            variant='danger'
            size='lg'
            onClick={this.onSubmit}
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
