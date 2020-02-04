import React from "react";
import {
  LeaverDetails
} from "../components";

/////////////////////////////////////////////////////////////////////////
const API = "/api";
const ROUTE = "/resignations/update/phase2";
const DONE = "done";
const PENDING = "pending";

/////////////////////////////////////////////////////////////////////////
export class SMCResignationDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastWorkDay: "",
      leaver: {},
      returnedHeadset: false,
      returnedKeys: false,
      returnedOhda: false,
      deduct: false,
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
    let params = this.props.match.params;
    let lastDay = params.lastWorkDay;
    this.fetchLeaverInfo(params.staffId);
    this.setState({
      lastWorkDay: lastDay
    })
  }

  ///////////////////////////////////////////////
  normalizeVal(value) {
    return value === "true" || value === "on"? true : false;
  }

  ///////////////////////////////////////////////
  checkStatus(condX, condY, condZ, condA) {
    if (condX === true && condY === true && condZ === true && condA === true) {
      return DONE;
    } else {
      return PENDING;
    }
  }

  ///////////////////////////////////////////////
  handleChange(event) {
    let state = {};
    state[event.target.id] = event.target.value;
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

    var returnedHeadsetNormalized = this.normalizeVal(
      this.state.returnedHeadset
    );
    var returnedKeysNormalized = this.normalizeVal(
      this.state.returnedKeys
    );
    var returnedOhdaNormalized = this.normalizeVal(
      this.state.returnedOhda
    );
    var deductNormalized = this.normalizeVal(
      this.state.deduct
    );

    let phase2 = {
      returnedHeadset: returnedHeadsetNormalized,
      disabledRemedyAccount: returnedKeysNormalized,
      returnedOhda: returnedOhdaNormalized,
      deduct: deductNormalized,
      comment: this.state.comment,
      status: this.checkStatus(
        returnedHeadsetNormalized,
        returnedKeysNormalized,
        returnedOhdaNormalized,
        deductNormalized
      )
    };

    fetch(API + ROUTE, {
      method: "post",
      body: JSON.stringify({
        staffId: this.state.leaver.staffId,
        phase2: phase2
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  }

  /////////////////////////////////////////////////////////////////////////
  render() {
    const { leaver } = this.state;

    return (
      <div className = "container">
        <center style = {{margin: "25px"}}>
          <div>
            <LeaverDetails leaverDetail = {{leaverInfo: leaver, lastDay: this.state.lastWorkDay}}/>
            <hr/>
            <div className = "d-flex flex-row">
              <div className = "p-2">disabled Secure ID</div>
              <select 
                id = "returnedHeadset"
                onChange = {this.handleChange}
                className = "p-2 form-control col-sm-1"
                defaultValue = {this.state.returnedHeadset}>
                <option value = {true}>Yes</option>
                <option value = {false}>No</option>
              </select>
            </div>
            <div className = "d-flex flex-row mt-3">
              <div className = "p-2">disabled Remedy Account</div>
              <select
                id = "returnedKeys"
                onChange = {this.handleChange}
                className = "p-2 form-control col-sm-1"
                defaultValue = {this.state.returnedKeys}>
                <option value = {true}>Yes</option>
                <option value = {false}>No</option>
              </select>
            </div>
            <br/>
            <div className = "d-flex flex-row mt-3">
              <div className = "p-2">disabled Accounts in Production Systems</div>
              <select 
                id = "returnedOhda"
                onChange = {this.handleChange}
                className = "p-2 form-control col-sm-1 text-center"
                defaultValue = {this.state.returnedOhda}>
                <option value = {true}>Yes</option>
                <option value = {false}>No</option>
              </select>
            </div>
            <br/>
            <div className = "d-flex flex-row mt-3">
              <div className = "p-2">Deduct</div>
              <input 
                id="deduct" 
                type="checkbox" 
                defaultChecked={this.state.deduct} 
                onChange={this.handleChange} 
                className = "p-2 form-control col-sm-1 text-center" />
            </div>
            <br/>
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
