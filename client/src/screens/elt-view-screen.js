import React from 'react';
import {
  LeaverDetails
} from "../components";

export class ELTViewScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      entry: [],
      lastWorkDay: ""
      //comment: ''
    };

    this.submit = this.submit.bind(this);
  }

  ///////////////////////////////////////////////
  getentry() {

    fetch(`/api/form/`, {
      method: 'post',
      body: JSON.stringify({ id: this.props.history.location.state.resId }),
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => {
          return response.json()
      })
      .then(data => {
        this.setState({
          entry: data,
        })
      })
      .catch(err => {
        throw err;
      })
  }

  ///////////////////////////////////////////////
  submit(e) {
    e.preventDefault();
    //var comment = e.target.elements.comment.value
    /* ("e.target::", e.target.elements.comment.value)
    ("staffId", this.state.entry.staffId); */

    let phase5 = {
      comment: e.target.elements.comment.value,
      status: "done"
    }
    fetch('/api/form/update', {
      method: 'post',
      body: JSON.stringify({
        staffId: this.props.history.location.state.resId,
        phase5: phase5
      }),
      headers: {
        'content-type': 'application/json'
      },
    })
    .then((res) => {
      return res.json();
    })
    .then(data => {
      return data;
    })
    .catch((err)=> {
      throw err;
    })
  }

  ///////////////////////////////////////////////
  onSubmit = (e) => {
    e.preventDefault();
  }

  ///////////////////////////////////////////////
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    //this.submit(comment)
  }

  ///////////////////////////////////////////////
  componentDidMount() {
    this.getentry()

    let lastDay = this.props.history.location.state.lastWorkDay;

    this.setState({
      lastWorkDay: lastDay
    })
  }

  ///////////////////////////////////////////////
  renderEntry() {
    return (
      Object.values(this.state.entry).map((value, index) => {
        //const { id, name, email, status } = value
        return (
          <data>
            {Object.values(value).map(id => <data>{id}</data>)}
          </data>
        )
      }
      )
    )
  };

  ///////////////////////////////////////////////
  render() {

    const {entry} = this.state;

    return (
      <div className = "container">
        <center style = {{margin: "25px"}}>
        <div>
            <LeaverDetails leaverDetail = {{leaverInfo: entry, lastDay: this.state.lastWorkDay}}/>
            <hr/>
            <form onSubmit={this.submit.bind(this)}>
              <div className = "d-flex flex-column form-group">
                <label className = "p-2 align-self-start" htmlFor = "comment">Comments</label>
                <textarea
                  id = "comment"
                  rows = "5"
                  onChange={this.handleChange}
                  className = "p-2 form-control"
                  placeholder="Enter your Comment"
                />
              </div>  
              <br />
              <div className="input-feedback">
                <span className="error">
                  {this.state.err !== "" ? this.state.err : ""}
                </span>
              </div>
              <br/>
              <input 
                style = {{width: "100px"}}
                type = "submit" 
                value = "Submit" 
                onClick={() => this.submit}
                className="btn btn-danger"  />
            </form>
        </div>
        </center>
      </div>
    );
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
}