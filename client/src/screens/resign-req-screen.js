// to do -> redirect after Submit
import React, { Component } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Table } from "semantic-ui-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { confirmAlert, onClose } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { ImageUploaderComponent } from "../components";

const API = "/api/";
const SEARCH = "users/search";
const SUBMIT = "resignations/";

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

// TODO: managerUsername instead of managerName
export class ResignReqScreen extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      className: "text-danger"
    });
    this.state = {
      staffId: "",
      returnedHeadset: false,
      returnedKeys: false,
      returnedLaptop: false,
      returnedLaptopBag: false,
      returnedMouse: false,
      comments: "",
      sickLeave: "",
      ohdaType: "",
      lastWorkDay: "",
      nationalId: "",
      nationalIdImg: null,
      annualsGranted: "",
      annualsTaken: "",
      noShow: "",
      lostHours: "",
      daysToTake: "",
      sapStaffId: "",
      name: "",
      managerName: this.props.managerName,
      ntAccount: "",
      department: "",
      careCenter: "",
      jobTitle: "",
      hiringDate: "",
      iex: "",
      mobile: "",
      recommended: "recommended",
      createdby: this.props.createdby,
      employeeFound: false,
      reason: "",
      otherReason: "",
      subDepartment: "--"
    };
  }

  static mapStateToProps(state) {
    return {
      createdby: state.auth.username,
      managerName: state.auth.account.name
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
        "content-type": "application/json"
      },
      method: "POST"
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({ employeeFound: true });
          return response.json();
        } else {
          toast.error("Employee not found");
          return undefined;
        }
      })
      .then(data => {
        if (data) {
          this.setState({ staffId: data.staffId });
          this.setState({ sapStaffId: data.staffId });
          this.setState({ name: data.name });
          this.setState({ department: data.department });
          this.setState({ careCenter: data.costCenter });
          this.setState({ jobTitle: data.jobTitle });
          this.setState({ hiringDate: data.hiringDate });
          this.setState({ username: data.username });
          this.setState({ nationalId: data.nationalId });
        }
      });
  };

  onSubmit = () => {
    if (this.state.subDepartment === "--") {
      toast.error("Please Choose a sub department");
    } else if (this.state.reason === "Other" && this.state.otherReason === "") {
      toast.error("Please enter the other reason for resignation");
    } else {
      if (this.state.reason !== "Other" && this.state.otherReason !== "") {
        this.setState({ otherReason: "" });
      }
      if (this.validator.allValid()) {
        fetch(API + SUBMIT, {
          body: JSON.stringify({
            staffId: this.state.staffId,
            managerName: this.state.managerName,
            name: this.state.name,
            createdby: this.state.createdby,
            status: "new",
            phase1: {
              status: "done",
              subDepartment: this.state.subDepartment,
              ntAccount: this.state.ntAccount,
              mobile: this.state.mobile,
              lastWorkDay: this.state.lastWorkDay,
              recommended: this.state.recommended,
              reason: this.state.reason,
              otherReason: this.state.otherReason,
              returnedHeadset: this.state.returnedHeadset,
              returnedKeys: this.state.returnedKeys,
              returnedLaptop: this.state.returnedLaptop,
              returnedLaptopBag: this.state.returnedLaptopBag,
              returnedMouse: this.state.returnedMouse,
              comments: this.state.comments,
              iex: this.state.iex,
              annualsGranted: this.state.annualsGranted,
              annualsTaken: this.state.annualsTaken,
              noShow: this.state.noShow,
              lostHours: this.state.lostHours,
              daysToTake: this.state.daysToTake,
              nationalId: this.state.nationalId,
              nationalIdImg: this.state.nationalIdImg
            },
            phase2: {
              status: "new",
              returnedHeadset: this.state.returnedHeadset,
              returnedKeys: this.state.returnedKeys,
              returnedLaptop: this.state.returnedLaptop,
              returnedLaptopBag: this.state.returnedLaptopBag,
              returnedMouse: this.state.returnedMouse,
              deduct: false,
              comment: this.state.comments
            },
            phase3: {
              status: "new",
              iex: this.state.iex,
              annualsGranted: this.state.annualsGranted,
              annualsTaken: this.state.annualsTaken,
              noShow: this.state.noShow,
              lostHours: this.state.lostHours,
              daysToTake: this.state.daysToTake
            },
            phase4: {
              status: "new",
              ratePlan: "",
              phoneBilledAmount: false,
              comment: ""
            },
            phase6: {
              status: "new",
              disabledSecureId: false,
              disabledRemedyAccount: false,
              disabledAccountsInProductionSystems: false,
              returnedHwToken: false,
              comment: ""
            },
            phase8: {
              status: "new",
              disabledAccount: false,
              physicalId: false,
              comment: ""
            }
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        }).then(response => {
          if (response.status === 200) {
            toast.success("Resignation Request Recieved");
          } else if (response.status === 503) {
            toast.error("Error in db");
          } else {
            toast.error("Resigation already exists");
          }
        });
      } else {
        toast.error("Please enter all required fields");
      }
    }
  };

  submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to submit this resignation request?",
      buttons: [
        {
          label: "Yes",
          onClick: this.onSubmit
        },
        {
          label: "No",
          onClick: onClose
        }
      ]
    });
  };

  ///////////////////////////////////////////////
  normalizeVal(value) {
    if (value === "true" || value === "on" || value === "Yes") {
      return true;
    } else if (value === "") {
      return "";
    } else if (value === "false" || value === "off" || value === "No") {
      return false;
    } else {
      return value;
    }
  }
  ///////////////////////////////////////////////

  handleChange = e => {
    if (e.target.name === "subDepartment") {
      this.checkSMCCustody();
    }
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

  createMapList(listt) {
    let options = [];
    listt.map(op => {
      options = [...options, <option value={op}>{op}</option>];
      return "";
    });
    return options;
  }
  createSelectItems() {
    if (this.state.department === "UK") {
      return this.createMapList(UK_SUBDEPT);
    } else if (this.state.department === "Cluster") {
      return this.createMapList(CLUSTER_SUBDEPT);
    } else if (this.state.department === "Enterprise") {
      return this.createMapList(ENTERPRISE_SUBDEPT);
    } else if (this.state.department === "TSSE") {
      return this.createMapList(TSSE_SUBDEPT);
    }
  }

  checkSMCCustody() {
    if (HAS_SMC.indexOf(this.state.subDepartment) < 0) {
      return (
        <div>
          <Row className="mt-2">
            <Col>
              <Form.Label className="col-form-group font-weight-bold">
                Returned Laptop
                <span style={{ color: "red", fontSize: 25 }}>*</span>
              </Form.Label>
            </Col>
            <Col>
              <Form.Control
                as="select"
                name="returnedLaptop"
                onChange={this.handleChange}
                defaultValue={this.state.returnedLaptop}
              >
                <option value={""}> N/A </option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Form.Control>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Form.Label className="col-form-group font-weight-bold">
                Returned Laptop Bag
                <span style={{ color: "red", fontSize: 25 }}>*</span>
              </Form.Label>
            </Col>
            <Col>
              <Form.Control
                as="select"
                name="returnedLaptopBag"
                onChange={this.handleChange}
                defaultValue={this.state.returnedLaptopBag}
              >
                <option value={""}> N/A </option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Form.Control>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Form.Label className="col-form-group font-weight-bold">
                Returned Mouse
                <span style={{ color: "red", fontSize: 25 }}>*</span>
              </Form.Label>
            </Col>
            <Col>
              <Form.Control
                as="select"
                name="returnedMouse"
                onChange={this.handleChange}
                defaultValue={this.state.returnedMouse}
              >
                <option value={""}> N/A </option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Form.Control>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Form.Label className="col-form-group font-weight-bold">
                Comments
              </Form.Label>
            </Col>
            <Col>
              <Form.Control
                as="textarea"
                rows="1"
                name="comments"
                onChange={this.handleChange}
              />
            </Col>
          </Row>
        </div>
      );
    } else {
      if (
        this.state.returnedLaptop !== "" ||
        this.state.returnedLaptopBag !== "" ||
        this.state.returnedMouse !== "" ||
        this.state.comments !== ""
      ) {
        this.setState({
          returnedLaptop: "",
          returnedLaptopBag: "",
          returnedMouse: "",
          comments: ""
        });
      }
    }
  }

  render() {
    this.validator.purgeFields();
    return (
      <Container fluid className="p-5 bg-light">
        <h3 className="text-center">Resignation Request</h3>
        <ToastContainer />
        <div className="row">
          <div className="offset-md-3 col-md-6 border rounded bg-white">
            <Form className="mt-4">
              <Form.Group className="p-3">
                <Form.Group className="p-2 border rounded">
                  <Row className="mt-2">
                    <Col>
                      <Form.Label className="col-form-group font-weight-bold">
                        Staff ID
                        <span style={{ color: "red", fontSize: 25 }}>*</span>
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        name="staffId"
                        id="id"
                        placeholder="12345"
                        className="form-control"
                        onChange={this.handleChange}
                        onBlur={() => this.validator.showMessageFor("staff id")}
                      />
                      {this.validator.message(
                        "staff id",
                        this.state.staffId,
                        "required"
                      )}
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        variant="danger"
                        onClick={this.onSearch}
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
                <Row hidden>
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
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
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
                      Employee Name
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control plaintext readOnly value={this.state.name} />
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
                      Manager username
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      plaintext
                      readOnly
                      value={this.state.createdBy}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
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
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
                      Job Title
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      plaintext
                      readOnly
                      value={this.state.jobTitle}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
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
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
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
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
                      Sub Department
                      <span style={{ color: "red", fontSize: 25 }}>*</span>
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      name="subDepartment"
                      onChange={this.handleChange}
                      defaultValue={this.state.subDepartment}
                    >
                      {this.createSelectItems()}
                    </Form.Control>
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
                      NT Account
                      <span style={{ color: "red", fontSize: 25 }}>*</span>
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      as="textarea"
                      rows="1"
                      name="ntAccount"
                      onChange={this.handleChange}
                      onBlur={() => this.validator.showMessageFor("nt Account")}
                    />
                    {this.validator.message(
                      "nt Account",
                      this.state.ntAccount,
                      "required|email"
                    )}
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
                      Mobile Number
                      <span style={{ color: "red", fontSize: 25 }}>*</span>
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      as="textarea"
                      rows="1"
                      name="mobile"
                      onChange={this.handleChange}
                      onBlur={() => this.validator.showMessageFor("Mobile")}
                    />
                    {this.validator.message(
                      "Mobile",
                      this.state.mobile,
                      "required|phone|size:11"
                    )}
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
                      Recommended to join Vodafone
                      <span style={{ color: "red", fontSize: 25 }}>*</span>
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      name="recommended"
                      defaultValue={this.state.recommended}
                      onChange={this.handleChange}
                    >
                      <option value="recommended">Recommended</option>
                      <option value="not recommended">Not Recommended</option>
                    </Form.Control>
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
                      Reason for resignation
                      <span style={{ color: "red", fontSize: 25 }}>*</span>
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      name="reason"
                      defaultValue={this.state.reason}
                      onChange={this.handleChange}
                    >
                      <option value="Better Offer">Better Offer</option>
                      <option value="Personal Issues">Personal Issues</option>
                      <option value="Traveling Abroad">Traveling Abroad</option>
                      <option value="Medical Condition">
                        Medical Condition
                      </option>
                      <option value="Study Needs">Study Needs</option>
                      <option value="Does not fit with job requirements">
                        Does not fit with job requirements
                      </option>
                      <option value="Missing Documents">
                        Missing Documents
                      </option>
                      <option value="HR Decision">HR Decision</option>
                      <option value="End of Contract">End of Contract</option>
                      <option value="Ending Probation">Ending Probation</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  </Col>
                  <Col></Col>
                </Row>
                {this.state.reason === "Other" && (
                  <Row className="mt-2">
                    <Col></Col>
                    <Col>
                      <Form.Control
                        as="textarea"
                        rows="1"
                        name="otherReason"
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col></Col>
                  </Row>
                )}
              </Form.Group>
              <hr />
              <Form.Group className="p-3">
                <Row required>
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
                      Returned Headset
                      <span style={{ color: "red", fontSize: 25 }}>*</span>
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      name="returnedHeadset"
                      onChange={this.handleChange}
                      defaultValue={this.state.returnedHeadset}
                    >
                      <option value={""}> N/A </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </Form.Control>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
                      Returned Keys
                      <span style={{ color: "red", fontSize: 25 }}>*</span>
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      name="returnedKeys"
                      onChange={this.handleChange}
                      defaultValue={this.state.returnedKeys}
                    >
                      <option value={""}> N/A </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </Form.Control>
                  </Col>
                </Row>
                {this.checkSMCCustody()}
              </Form.Group>
              <hr />
              <Form.Group className="p-3 form-group">
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="d-flex justify-content-center h4 font-weight-bold">
                      Leave Balance
                    </Form.Label>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
                      IEX
                    </Form.Label>
                    <Form.Control
                      className="col-xs-1 w-25"
                      as="textarea"
                      rows="1"
                      name="iex"
                      onChange={this.handleChange}
                      onBlur={() => this.validator.showMessageFor("iex")}
                    />
                    {this.validator.message("iex", this.state.iex, "required")}
                  </Col>
                </Row>
                <Table celled className="mt-2">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell scope="col">
                        Annuals Granted
                      </Table.HeaderCell>
                      <Table.HeaderCell scope="col">
                        Annuals Taken
                      </Table.HeaderCell>
                      <Table.HeaderCell scope="col">No Show</Table.HeaderCell>
                      <Table.HeaderCell scope="col">
                        Lost Hours
                      </Table.HeaderCell>
                      <Table.HeaderCell scope="col">
                        In Lieu Days to Take
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell scope="row">
                        <Form.Control
                          as="textarea"
                          rows="1"
                          name="annualsGranted"
                          onChange={this.handleChange}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Form.Control
                          as="textarea"
                          rows="1"
                          name="annualsTaken"
                          onChange={this.handleChange}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Form.Control
                          as="textarea"
                          rows="1"
                          name="noShow"
                          onChange={this.handleChange}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Form.Control
                          as="textarea"
                          rows="1"
                          name="lostHours"
                          onChange={this.handleChange}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Form.Control
                          as="textarea"
                          rows="1"
                          name="daysToTake"
                          onChange={this.handleChange}
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
                      Pending Sick Leave
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      name="sickLeave"
                      onChange={this.handleChange}
                      defaultValue={this.state.sickLeave}
                    >
                      <option value={""}> N/A </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
              <hr />
              <Form.Group className="p-3">
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
                      Last Working Day
                      <span style={{ color: "red", fontSize: 25 }}>*</span>
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type="date"
                      id="last"
                      name="lastWorkDay"
                      min="2018-01-01"
                      max="2060-12-31"
                      onChange={this.handleChange}
                      onBlur={() =>
                        this.validator.showMessageFor("last working day")
                      }
                    ></Form.Control>
                    {this.validator.message(
                      "last working day",
                      this.state.lastWorkDay,
                      "required"
                    )}
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
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
                <Row className="mt-2">
                  <Col>
                    <Form.Label className="col-form-group font-weight-bold">
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
                variant="danger"
                className="mb-3"
                size="lg"
                onClick={this.submit}
                block
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    );
  }
}

export const ConnectedResignScreen = connect(ResignReqScreen.mapStateToProps)(
  ResignReqScreen
);
