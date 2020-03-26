import React, { Component } from 'react';
import {
  Container, Form, Row, Col,
  Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleReactValidator from 'simple-react-validator';

const API = '/api/';
const SEARCH = 'users/search'
const UPDATE = 'resignations/update/request'

const UK_SUBDEPT = ['--','UK','UK Telesales'];
const CLUSTER_SUBDEPT = ['--','IR','IR Telesales','GE','Spain','CIOT','VAS','VDA','Others'];
const ENTERPRISE_SUBDEPT = ['--','UK SMB','IR SME','Spain BO','Italy Enterprise','GESC','Enterprise HOC','EBU Back Office','ESS','EG Post','Others'];
const TSSE_SUBDEPT = ['--','AD','AO','AT','NEW-TA','OIT','OPC','SEA-COE','TES','Others'];

const hasSMC = ['UK','UK Telesales','IR','IR Telesales','GE','Spain','UK SMB','IR SME']

export class ManagerResignationsViewScreen extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      className: 'text-danger'
    });
    this.state = {
      staffId: '',
      sapStaffId: '',
      name: '',
      managerName: '',
      careCenter: '',
      jobTitle: '',
      hiringDate: '',
      department: '',
      subDepartment:'',
      ntAccount: '',
      mobile: '',
      lastWorkDay: '',
      recommended: '',
      reason : '',
      otherReason: '',
      returnedHeadset: false,
      returnedKeys: false,
      returnedLaptop: false,
      returnedLaptopBag: false,
      returnedMouse: false,
      comments: '',
      nationalId: '',
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
      managerName: request.managerName,
      ntAccount:request.phase1.ntAccount,
      lastWorkDay: request.phase1.lastWorkDay,
      mobile: request.phase1.mobile,
      recommended: request.phase1.recommended,
      reason: request.phase1.reason,
      otherReason: request.phase1.otherReason,
      returnedHeadset: request.phase1.returnedHeadset,
      returnedKeys: request.phase1.returnedKeys,
      returnedLaptop: request.phase1.returnedLaptop,
      returnedLaptopBag: request.phase1.returnedLaptopBag,
      returnedMouse: request.phase1.returnedMouse,
      comments: request.phase1.comments,
      nationalId: request.phase1.nationalId,
      subDepartment: request.phase1.subDepartment,
      createdby: request.createdby
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
            department: data.department,
            careCenter: data.careCenter,
            jobTitle: data.jobTitle,
            hiringDate: data.hiringDate,
          });
        }
      })
  }

  handleChange = e => {
    if (e.target.name === 'subDepartment'){
      this.checkSMCCustody()
    }
    this.setState({ [e.target.name]: this.normalizeVal(e.target.value) });
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
  ///////////////////////////////////////////////

  onUpdate = (e) => {
    e.preventDefault();
    if(this.state.subDepartment === '--'){
      toast.error('Please Choose a sub department');
    }
    else if(this.state.reason === 'Other' && this.state.otherReason === ''){
      toast.error('Please enter the other reason for resignation');
    }
    else {
      if(this.state.reason !== 'Other' && this.state.otherReason !== ''){
        this.setState({otherReason:''});
      }
      if (this.validator.allValid()) {
        let phase1 = {
          ...this.state.resReq.phase1,
          subDepartment: this.state.subDepartment,
          ntAccount: this.state.ntAccount,
          recommended:this.state.recommended,
          reason: this.state.reason,
          otherReason: this.state.otherReason,
          returnedHeadset: this.state.returnedHeadset,
          returnedKeys: this.state.returnedKeys,
          returnedLaptop: this.state.returnedLaptop,
          returnedLaptopBag: this.state.returnedLaptopBag,
          returnedMouse: this.state.returnedMouse,
          comments: this.state.comments,
          ohdaType: this.state.ohdaType,
          lastWorkDay: this.state.lastWorkDay,
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
      } else {
          toast.error('Please enter all required fields');
        }
    }
  }

  createMapList(listt){
    let options = []
    listt.map((op) => {
      options = [ ...options, <option value={op}>{op}</option>];
      return ""
    })
    return options
  }
  createSelectItems() {
    if (this.state.department === 'UK') {
      return this.createMapList(UK_SUBDEPT);
    } else if (this.state.department === 'Cluster') {
      return this.createMapList(CLUSTER_SUBDEPT);
    } else if (this.state.department === 'Enterprise') {
      return this.createMapList(ENTERPRISE_SUBDEPT);
    } else if (this.state.department === 'TSSE') {
      return this.createMapList(TSSE_SUBDEPT);
    }
  }

  checkSMCCustody(){
    if (hasSMC.indexOf(this.state.subDepartment) < 0) {
      return (
      <div>
        <Row className='mt-2'>
          <Col>
            <Form.Label className='col-form-group font-weight-bold'>
              Returned Laptop
          <span style={{ color: 'red', fontSize: 25 }}>*</span>
            </Form.Label>
          </Col>
          <Col>
            <Form.Control
              as='select'
              name='returnedLaptop'
              onChange={this.handleChange}
              value={this.state.returnedLaptop}
            >
              <option value={''}> N/A </option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Form.Control>
          </Col>
        </Row> 
        <Row className='mt-2'>
          <Col>
            <Form.Label className='col-form-group font-weight-bold'>
              Returned Laptop Bag
          <span style={{ color: 'red', fontSize: 25 }}>*</span>
            </Form.Label>
          </Col>
          <Col>
            <Form.Control
              as='select'
              name='returnedLaptopBag'
              onChange={this.handleChange}
              value={this.state.returnedLaptopBag}
            >
              <option value={''}> N/A </option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Form.Control>
          </Col>
        </Row> 
        <Row className='mt-2'>
          <Col>
            <Form.Label className='col-form-group font-weight-bold'>
              Returned Mouse
          <span style={{ color: 'red', fontSize: 25 }}>*</span>
            </Form.Label>
          </Col>
          <Col>
            <Form.Control
              as='select'
              name='returnedMouse'
              onChange={this.handleChange}
              value={this.state.returnedMouse}
            >
              <option value={''}> N/A </option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Form.Control>
          </Col>
        </Row> 
        <Row className='mt-2'>
          <Col>
            <Form.Label className='col-form-group font-weight-bold'>
              Comments
            </Form.Label>
          </Col>
          <Col>
            <Form.Control
              as='textarea'
              rows='1'
              name='comments'
              value={this.state.comments}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
      </div>
    )}
    else {
      if (this.state.returnedLaptop !== '' || this.state.returnedLaptopBag !== '' || this.state.returnedMouse !== '' || this.state.comments !== '') {
        this.setState({
        returnedLaptop:'',
        returnedLaptopBag:'',
        returnedMouse:'',
        comments:''
        });
      }
    }
  }

  render() {
    return (
      <Container fluid className='p-5 bg-light'>
        <h3 className='text-center'>Resignation Request</h3>
        <ToastContainer />
        <div className="row">
          <div className="offset-md-3 col-md-6 border rounded bg-white">
          <Form className='mt-4'>
          <Form.Group className='p-3 form-group'>
            <Row className='mt-2'>
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
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>Employee Name</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.name} /></Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>Manager Name</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.managerName} /></Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>Cost Center</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.careCenter} /></Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>Job Title</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.jobTitle} /></Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>Hiring Date</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.hiringDate} /></Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col><Form.Label className='col-form-group font-weight-bold'>Department</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.department} /></Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col>
                  <Form.Label className='col-form-group font-weight-bold'>
                    Sub Department
                  <span style={{ color: 'red', fontSize: 25 }}>*</span>
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    as='select'
                    name='subDepartment'
                    onChange={this.handleChange}
                    value={this.state.subDepartment}
                  >
                  {this.createSelectItems()}
                  </Form.Control>
                </Col>
                <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  NT Account
                  <span style={{ color: 'red', fontSize: 25 }}>*</span>
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as='textarea'
                  rows='1'
                  name='ntAccount'
                  onChange={this.handleChange}
                  value={this.state.ntAccount}
                  onBlur={() =>
                    this.validator.showMessageFor('nt Account')
                  }
                />
                {this.validator.message(
                  'nt Account',
                  this.state.ntAccount,
                  'required|email'
                )}
              </Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
            <Col>
              <Form.Label className='col-form-group font-weight-bold'>
                Mobile Number
                <span style={{ color: 'red', fontSize: 25 }}>*</span>
              </Form.Label>
            </Col>
            <Col>
              <Form.Control
                as='textarea'
                rows='1'
                name='mobile'
                onChange={this.handleChange}
                value={this.state.mobile}
                onBlur={() =>
                  this.validator.showMessageFor('Mobile')
                }
              />
              {this.validator.message(
                'Mobile',
                this.state.mobile,
                'required|phone|size:11'
              )}
            </Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Recommended to join Vodafone
              <span style={{ color: 'red', fontSize: 25 }}>*</span>
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as = 'select'
                  name='recommended'
                  value={this.state.recommended}
                  onChange={this.handleChange}
                >
                  <option value = 'recommended'>Recommended</option>
                  <option value = 'not recommended'>Not Recommended</option>
                </Form.Control>
              </Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Reason for resignation
                <span style={{ color: 'red', fontSize: 25 }}>*</span>
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as = 'select'
                  name='reason'
                  value={this.state.reason}
                  onChange={this.handleChange}
                >
                  <option value = 'Better Offer'>Better Offer</option>
                  <option value = 'Personal Issues'>Personal Issues</option>
                  <option value = 'Traveling Abroad'>Traveling Abroad</option>
                  <option value = 'Medical Condition'>Medical Condition</option>
                  <option value = 'Study Needs'>Study Needs</option>
                  <option value = 'Does not fit with job requirements'>Does not fit with job requirements</option>
                  <option value = 'Missing Documents'>Missing Documents</option>
                  <option value = 'HR Decision'>HR Decision</option>
                  <option value = 'End of Contract'>End of Contract</option>
                  <option value = 'Ending Probation'>Ending Probation</option>
                  <option value = 'Other'>Other</option>
                </Form.Control>
              </Col>
              <Col></Col>
            </Row>
            { this.state.reason === "Other" &&
            <Row className='mt-2'>
              <Col></Col>
              <Col>
              <Form.Control
                as='textarea'
                rows='1'
                name='otherReason'
                onChange={this.handleChange}
                value={this.state.otherReason}
              />
              </Col>
              <Col></Col>
            </Row>
            }
          </Form.Group>
          <hr/>
          <Form.Group className='p-3 form-group'>
            <Row className='mt-2'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Returned Headset
                <span style={{ color: 'red', fontSize: 25 }}>*</span>
                </Form.Label>
                  </Col>
              <Col>
                <Form.Control as="select" name="returnedHeadset" onChange={this.handleChange} value={this.state.returnedHeadset}>
                  <option value={""}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Returned Keys
                <span style={{ color: 'red', fontSize: 25 }}>*</span>
                </Form.Label>
              </Col>
              <Col>
                <Form.Control as="select" name="returnedKeys" onChange={this.handleChange} value={this.state.returnedKeys}>
                  <option value={""}> N/A </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Col>
            </Row>
            {this.checkSMCCustody()}
          </Form.Group>
          <hr/>
          <Form.Group className='p-3 form-group'>
            <Row className='mt-2'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  Last Working Day
                <span style={{ color: 'red', fontSize: 25 }}>*</span>
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type='date'
                  id='last'
                  name='lastWorkDay'
                  min='2018-01-01'
                  max='2060-12-31'
                  onChange={this.handleChange}
                  value={this.state.lastWorkDay}
                  onBlur={() =>
                    this.validator.showMessageFor('last working day')
                  }
                ></Form.Control>
                {this.validator.message(
                  'last working day',
                  this.state.lastWorkDay,
                  'required'
                )}
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col>
                <Form.Label className='col-form-group font-weight-bold'>
                  National ID Number
                </Form.Label>
              </Col>
              <Col><Form.Control plaintext readOnly value={this.state.nationalId} /></Col>
            </Row>
          </Form.Group>
          <br />
          <Button type="submit" variant="danger" size="lg" onClick={this.onUpdate} block>Update</Button>
          <br />
        </Form>
        </div>
      </div>
    </Container>
    );
  }
}
