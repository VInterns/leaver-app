import React from "react";
import { 
  Table,

} from "react-bootstrap";

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

  componentDidMount() {
    const retResignation = this.props.location.state.resDetails;

    this.setState({
      resignationDetails: retResignation
    });

    this.fetchLeaverInfo(retResignation.staffId);

  }

  normalizeVal(value) {
    return value === "true" ? true : false;
  }

  checkStatus(condX) {
    return (condX === true)? DONE: PENDING;
  }

  handleChange(event) {
    let state = {};
    state[event.target.id] = event.target.value;
    this.setState(state);
  }

  fetchLeaverInfo(searchId){

    let QUERY = "/users/?id=" + searchId;

    fetch(API + QUERY, {
      method: "get",
      headers: {"Content-Type": "application/json"}
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
      if(err)
        throw err;
    })

  }

  submitButton(event) {
    event.preventDefault();

    var returnedHwTokenNormalized = this.normalizeVal(this.state.returnedHwToken)

    let phase7 = {
      returnedHwToken: returnedHwTokenNormalized,
      comment: this.state.comment,
      status: this.checkStatus(returnedHwTokenNormalized)
    };

    fetch(API + ROUTE, {
      method: "post",
      body: JSON.stringify({
        staffId: this.state.resignationDetails.staffId,
        phase7: phase7
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data
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
      <div className = "container">
        <center style = {{margin: "25px"}}>
          <header>
            <hr/>
            <h3>Leaver Info</h3>
            <hr/>
          </header>
          <div>
            <div>
              <Table bordered hover>
                <tbody>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Staff ID:</span> {leaver.staffId}</td>
                    <td><span style = {{fontWeight: "bold"}} >SAP Stuff ID:</span> {leaver.sapStaffId}</td>
                  </tr>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Leaver Name:</span> {leaver.name}</td>
                    <td><span style = {{fontWeight: "bold"}} >Manager:</span> {leaver.managerName}</td>
                  </tr>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Department:</span> {leaver.department}</td>
                    <td><span style = {{fontWeight: "bold"}} >Cost Center:</span> {leaver.costCenter}</td>
                  </tr>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Job Title:</span> {leaver.jobTitle}</td>
                    <td><span style = {{fontWeight: "bold"}} >Hiring Date:</span> {leaver.hiringDate}</td>
                  </tr>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Mobile Number:</span> {"+" + leaver.mobile}</td>
                    <td><span style = {{fontWeight: "bold"}} >Last Working Day:</span> {phase1.lastWorkDay}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <hr/>
            <div className = "d-flex flex-row">
              <div className = "p-2">Returned HW Token</div>
              <select 
                id = "returnedHwToken"
                onChange = {this.handleChange}
                className = "p-2 form-control col-sm-1"
                defaultValue = {this.state.returnedHwToken}>
                <option value = {true}>Yes</option>
                <option value = {false}>No</option>
              </select>
            </div>
            <div className = "d-flex flex-column mt-3">
              <label htmlFor = "comment" className = "p-2 align-self-start">Comments</label>
              <textarea
                id = "comment"
                rows = "5"
                onChange = {this.handleChange}
                className = "p-2 form-control"/>
            </div>
            <button 
              style = {{ width: '100px' }}
              onClick = {this.submitButton}
              className = "btn btn-danger mt-3" 
              >Submit
            </button>
          </div>
        </center>
      </div>
    );
  }
}
