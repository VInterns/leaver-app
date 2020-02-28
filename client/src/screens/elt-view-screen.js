import React from 'react';
import {
  LeaverDetails
} from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/////////////////////////////////////////////////////////////////////////
const API = "/api";

/////////////////////////////////////////////////////////////////////////
export class ELTViewScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      entry: [],
      lastWorkDay: '',
      comment: ""
    };

    this.getEntry = this.getEntry.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  ///////////////////////////////////////////////
  getEntry(searchId) {

    let QUERY = "/users/?id=" + searchId;

    fetch(API + QUERY, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          entry: data
        })
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      })
  }

  ///////////////////////////////////////////////
  submit(e) {

    e.preventDefault();
    let phase5 = {
      comment: e.target.elements.comment.value,
      status: "done"
    }

    fetch('/api/resignations/update/phase5', {
      method: 'post',
      body: JSON.stringify({
        staffId: this.props.history.location.state.resId,
        phase5: phase5
      }),
      headers: {
        'content-type': 'application/json'
      },
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

  ///////////////////////////////////////////////
  handleChange(e){
    this.setState({ [e.target.id]: e.target.value });
  }

  ///////////////////////////////////////////////
  componentDidMount() {

    let lastDay = this.props.history.location.state.lastWorkDay;
    let staffID = this.props.history.location.state.resId;
    let phase5Comment = this.props.history.location.state.comment;
    
    this.getEntry(staffID)
    this.setState({
      lastWorkDay: lastDay,
      comment: phase5Comment

    })
  }

  ///////////////////////////////////////////////
  render() {

    const { entry } = this.state;

    return (
      <div className="container">
        <ToastContainer />
        <center style={{ margin: "25px" }}>
          <div>
            <LeaverDetails leaverDetail={{ leaverInfo: entry, lastDay: this.state.lastWorkDay }} />
            <hr />
            <form onSubmit={this.submit.bind(this)}>
              <div className="d-flex flex-column form-group">
                <label className="p-2 align-self-start" htmlFor="comment">Comments</label>
                <textarea
                  id="comment"
                  rows="5"
                  onChange={this.handleChange}
                  className="p-2 form-control"
                  placeholder="Enter your Comment"
                  value={this.state.comment}
                />
              </div>
              <br />
              <div className="input-feedback">
                <span className="error">
                  {this.state.err !== "" ? this.state.err : ""}
                </span>
              </div>
              <br />
              <input
                style={{ width: "100px" }}
                type="submit"
                value="Submit"
                onClick={() => this.submit}
                className="btn btn-danger" />
            </form>
          </div>
        </center>
      </div>
    );
  }
}