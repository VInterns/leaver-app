import React from "react";
import { 
  LeaverDetails
} from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/////////////////////////////////////////////////////////////////////////
const API = "/api";
const ROUTE = "/resignations/update/phase7";
const DONE = "done";

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

  ///////////////////////////////////////////////
  componentDidMount() {
    const retResignation = this.props.location.state.resDetails;

    this.setState({
      resignationDetails: retResignation
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

    let phase7 = {
      returnedHwToken: this.state.returnedHwToken,
      comment: this.state.comment,
      status: DONE
    };

    fetch(API + ROUTE, {
      method: "post",
      body: JSON.stringify({
        staffId: this.state.resignationDetails.staffId,
        phase7: phase7
      }),
      headers: { "Content-Type": "application/json" }
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

  /////////////////////////////////////////////////////////////////////////
  render() {
    const { resignationDetails, leaver } = this.state;
    const phase1 = Object(resignationDetails.phase1);

    return (
      <div className = "container">
        <ToastContainer />
        <center style = {{margin: "25px"}}>
          <div>
            <LeaverDetails leaverDetail = {{leaverInfo: leaver, lastDay: phase1.lastWorkDay}}/>
            <hr/>
            <div className = "d-flex flex-row">
              <div className = "p-2">Returned HW Token</div>
              <select 
                id = "returnedHwToken"
                onChange = {this.handleChange}
                className = "p-2 form-control col-sm-1"
                value = {this.state.returnedHwToken}>
                <option value = {""}> N/A </option>
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
