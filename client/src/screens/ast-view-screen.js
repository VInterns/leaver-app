import React from "react";
import { 
  Table,

} from "react-bootstrap";

/////////////////////////////////////////////////////////////////////////
const API = "/api";
const ROUTE = "/resignations/update/phase6";
const DONE = "done";
const PENDING = "pending";

/////////////////////////////////////////////////////////////////////////
export class ASTResignationDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resignationDetails: {},
      disabledSecureId: false,
      disabledRemedyAccount: false,
      disabledAccountsInProductionSystems: false,
      comment: ""
    };

    this.checkStatus = this.checkStatus.bind(this);
    this.normalizeVal = this.normalizeVal.bind(this);
    this.submitButton = this.submitButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const retResignation = this.props.location.state.resDetails;
    this.setState({
      resignationDetails: retResignation
    });
  }

  normalizeVal(value) {
    return value === "true" ? true : false;
  }

  checkStatus(condX, condY, condZ) {
    if (condX === true && condY === true && condZ === true) {
      return DONE;
    } else {
      return PENDING;
    }
  }

  handleChange(event) {
    let state = {};
    state[event.target.id] = event.target.value;
    this.setState(state);
  }

  submitButton(event) {
    event.preventDefault();

    var disabledSecureIdNormalized = this.normalizeVal(
      this.state.disabledSecureId
    );
    var disabledRemedyAccountNormalized = this.normalizeVal(
      this.state.disabledRemedyAccount
    );
    var disabledAccountsInProductionSystemsNormalized = this.normalizeVal(
      this.state.disabledAccountsInProductionSystems
    );

    let phase6 = {
      disabledSecureId: disabledSecureIdNormalized,
      disabledRemedyAccount: disabledRemedyAccountNormalized,
      disabledAccountsInProductionSystems: disabledAccountsInProductionSystemsNormalized,
      comment: this.state.comment,
      status: this.checkStatus(
        disabledSecureIdNormalized,
        disabledRemedyAccountNormalized,
        disabledAccountsInProductionSystemsNormalized
      )
    };

    fetch(API + ROUTE, {
      method: "post",
      body: JSON.stringify({
        staffId: this.state.resignationDetails.staffId,
        phase6: phase6
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        throw err;
      });
  }

  /////////////////////////////////////////////////////////////////////////
  render() {
    const { resignationDetails } = this.state;
    const phase1 = Object(resignationDetails.phase1);

    return (
      <div className = "container">
        <center style = {{margin: "25px"}}>
          <h3>Leaver Info</h3>
          <hr/>
          <div>
            <div>
              <Table bordered hover>
                <tbody>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Staff ID:</span> {resignationDetails.staffId}</td>
                    <td><span style = {{fontWeight: "bold"}} >SAP Stuff ID:</span> {resignationDetails.sapStuffId}</td>
                  </tr>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Leaver Name:</span> {resignationDetails.name}</td>
                    <td><span style = {{fontWeight: "bold"}} >Manager:</span> {resignationDetails.managerName}</td>
                  </tr>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Department:</span> {resignationDetails.department}</td>
                    <td><span style = {{fontWeight: "bold"}} >Cost Center:</span> {resignationDetails.costCenter}</td>
                  </tr>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Job Title:</span> {resignationDetails.jobTitle}</td>
                    <td><span style = {{fontWeight: "bold"}} >Hiring Date:</span> {resignationDetails.hiringDate}</td>
                  </tr>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Mobile Number:</span> {resignationDetails.mobile}</td>
                    <td><span style = {{fontWeight: "bold"}} >Last Working Day:</span> {phase1.lastWorkDay}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <hr/>
            <div className = "d-flex flex-row align-content-center">
              <div className = "p-2">disabled Secure ID</div>
              <select 
                id = "disabledSecureId"
                onChange = {this.handleChange}
                className = "p-2 form-control col-sm-1"
                defaultValue = {this.state.disabledSecureId}>
                <option value = {true}>Yes</option>
                <option value = {false}>No</option>
              </select>
            </div>
            <div className = "d-flex flex-row mt-3">
              <div className = "p-2">disabled Remedy Account</div>
              <select 
                id = "disabledRemedyAccount"
                onChange = {this.handleChange}
                className = "p-2 form-control col-sm-1"
                defaultValue = {this.state.disabledRemedyAccount}>
                <option value = {true}>Yes</option>
                <option value = {false}>No</option>
              </select>
            </div>
            <br/>
            <div className = "d-flex flex-row mt-3">
              <div className = "p-2">disabled Accounts in Production Systems</div>
              <select 
                id = "disabledAccountsInProductionSystems"
                onChange = {this.handleChange}
                className = "p-2 form-control col-sm-1"
                defaultValue = {this.state.disabledAccountsInProductionSystems}>
                <option value = {true}>Yes</option>
                <option value = {false}>No</option>
              </select>
            </div>
            <br/>
            <div className = "d-flex flex-column mt-3">
              <label for = "comment" className = "p-2 align-self-start">Comments</label>
              <textarea
                id = "comment"
                rows = "5"
                type = "textarea"
                onChange = {this.handleChange}
                className = "p-2 form-control"/>
            </div>
            <button 
              style = {{ width: '100px' }}
              onClick = {this.submitButton}
              className = "btn btn-primary mt-3" 
              >Submit
            </button>
          </div>
        </center>
      </div>
    );
  }
}
