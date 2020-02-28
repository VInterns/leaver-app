import React from "react";
import { 
  LeaverDetails
} from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      leaver: {},
      disabledSecureId: false,
      disabledRemedyAccount: false,
      disabledAccountsInProductionSystems: false,
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
    const phase6 = retResignation.phase6
    this.setState({
      resignationDetails: retResignation,
      disabledSecureId:phase6.disabledSecureId,
      disabledRemedyAccount:phase6.disabledRemedyAccount,
      disabledAccountsInProductionSystems:phase6.disabledAccountsInProductionSystems,
      comment:phase6.comment
    });

    this.fetchLeaverInfo(retResignation.staffId);

  }

  ///////////////////////////////////////////////
  normalizeVal(value) {
    if (value === 'true' || value === "on" || value === "Yes"){
      return true;
    }
    else if (value === "") {
      return "";
    }
    else if (value === 'false' || value === "off" || value === "No"){
      return false;
    }
    else {
      return value
    }
  }

  ///////////////////////////////////////////////
  checkStatus(condX, condY, condZ) {
    // check confition after adding N/A
    if ((condX === true || condX === "") && (condY === true || condY === "") && (condZ === true || condZ === "")) {
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

  ///////////////////////////////////////////////
  submitButton(event) {
    event.preventDefault();

    let phase6 = {
      disabledSecureId: this.state.disabledSecureId,
      disabledRemedyAccount: this.state.disabledRemedyAccount,
      disabledAccountsInProductionSystems: this.state.disabledAccountsInProductionSystems,
      comment: this.state.comment,
      status: this.checkStatus(
        this.state.disabledSecureId,
        this.state.disabledRemedyAccount,
        this.state.disabledAccountsInProductionSystems
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
    .then((response) => {
      if (response.status === 200) {
        toast.success("Security data submitted");
      }
      else if (response.status === 503) {
        toast.error("Error in db");
      }
      else {
        toast.error("Security data cannot be updated");
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
      <div className = "container">
        <ToastContainer />
        <center style = {{margin: "25px"}}>
            <LeaverDetails leaverDetail = { {leaverInfo: leaver, lastDay: phase1.lastWorkDay}}/>
            <hr/>
            <div className = "d-flex flex-row">
              <div className = "p-2">disabled Secure ID</div>
              <select 
                id = "disabledSecureId"
                onChange = {this.handleChange}
                className = "p-2 form-control col-sm-1"
                value = {this.state.disabledSecureId}>
                <option value = {""}>N/A</option>
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
                value = {this.state.disabledRemedyAccount}>
                <option value = {""}>N/A</option>
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
                className = "p-2 form-control col-sm-1 text-center"
                value = {this.state.disabledAccountsInProductionSystems}>
                <option value = {""}>N/A</option>
                <option value = {true}>Yes</option>
                <option value = {false}>No</option>
              </select>
            </div>
            <br/>
            <div className = "d-flex flex-column mt-3">
              <label htmlFor = "comment" className = "p-2 align-self-start">Comments</label>
              <textarea
                id = "comment"
                rows = "5"
                onChange = {this.handleChange}
                className = "p-2 form-control"
                value = {this.state.comment}/>
            </div>
            <button 
              style = {{ width: '100px' }}
              onClick = {this.submitButton}
              className = "btn btn-danger mt-3" 
              >Submit
            </button>
        </center>
      </div>
    );
  }
}
