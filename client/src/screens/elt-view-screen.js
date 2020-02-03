import React from 'react';
import {
  Table
} from "react-bootstrap";

export class FormRes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: []
      //comment: ''
    };

    this.submit = this.submit.bind(this);

  }
  getentry() {
    //console.log(this.props.history.location.pathname.split('/')[2])
    fetch(`/api/form/`, {
      method: 'post',
      //mode: 'no-cors',
      body: JSON.stringify({ id: this.props.history.location.state.resId }),
      headers: {
        'content-type': 'application/json'
      },
      //body: JSON.stringify({id: '2345'})
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          entry: data,
        })
      )
  }
  submit(e) {
    e.preventDefault();
    //var comment = e.target.elements.comment.value
    /* console.log("e.target::", e.target.elements.comment.value)
    console.log("staffId", this.state.entry.staffId); */

    let phase5 = {
      comment: e.target.elements.comment.value
    }
    fetch('/api/form/update', {
      method: 'post',
      body: JSON.stringify({
        staffId: this.state.entry.staffId,
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
      console.log(data);
    })
    .catch((err)=> {
      throw err;
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
  }
  handleChange = e => {
    //this.setState({ comment: e.target.elements.value });
    //console.log(e.target.tagName);
    this.setState({ [e.target.id]: e.target.value });
    //this.submit(comment)
  }
  componentDidMount() {
    this.getentry()
    /* console.log()
    console.log(this.props.history) */
    //console.log(this.props.history.location.pathname.split('/')[2])
  }
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
  render() {

    const {entry} = this.state;
    const phase1 = Object(entry.phase1);

    return (
      <div className = "container">
        <center style = {{margin: "25px"}}>
        <h3>Leaver Info</h3>
        {/* <h2>Leaver Details</h2> */}
        <data>{null}</data>
        <hr/>
        <div>
            <div>
              <Table bordered hover>
                <tbody>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Staff ID:</span> {entry.staffId}</td>
                    <td><span style = {{fontWeight: "bold"}} >SAP Stuff ID:</span> {entry.sapStuffId}</td>
                  </tr>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Leaver Name:</span> {entry.name}</td>
                    <td><span style = {{fontWeight: "bold"}} >Manager:</span> {entry.managerName}</td>
                  </tr>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Department:</span> {entry.department}</td>
                    <td><span style = {{fontWeight: "bold"}} >Cost Center:</span> {entry.costCenter}</td>
                  </tr>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Job Title:</span> {entry.jobTitle}</td>
                    <td><span style = {{fontWeight: "bold"}} >Hiring Date:</span> {entry.hiringDate}</td>
                  </tr>
                  <tr>
                    <td><span style = {{fontWeight: "bold"}} >Mobile Number:</span> {entry.mobile}</td>
                    <td><span style = {{fontWeight: "bold"}} >Last Working Day:</span> {phase1.lastWorkDay}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
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
                className="btn btn-primary"  />
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