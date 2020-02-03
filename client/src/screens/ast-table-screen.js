import React from "react";
import { Table } from "react-bootstrap";

/////////////////////////////////////////////////////////////////////////
const API = "/api/";
const SEARCH = "resignations/";

/////////////////////////////////////////////////////////////////////////
export class ASTTableScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: []
    };

    this.checkStatus = this.checkStatus.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.fetchResignations = this.fetchResignations.bind(this);
  }

  componentDidMount() {
    this.fetchResignations();
  }

  checkStatus(status){
    switch(status){
      case "pending":
        return (
          <td style = {{color: "#BE0002", fontWeight: "bold", textTransform: "uppercase"}}>{status}</td>
        );
      case "done": 
      return (
        <td style = {{color: "#5cb85c", fontWeight: "bold", textTransform: "uppercase"}}>{status}</td>
      );
      default:
        return (
          <td style = {{color: "#34a1fd", fontWeight: "bold", textTransform: "uppercase"}}>{status}</td>
        );
    }
  }

  onRowClick(resignation) {
    this.props.history.push({
      pathname: "/ast-resignation",
      state: { resDetails: resignation }
    });
  }

  fetchResignations() {
    fetch(API + SEARCH)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          requests: data
        });
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  render() {
    const { requests } = this.state;
    return (
      <div className="container">
        <center style={{ margin: '25px' }}>
          <header className="ast-header"> 
            <h3>Application Security Team</h3>
            </header>
          <hr/>
          <div className="ast-data">
            <Table className="ast" bordered hover>
              <thead>
                <tr style = {{backgroundColor: "#BE0002"}}>
                  <th style = {{color: "white"}}>Staff ID</th>
                  <th style = {{color: "white"}}>Employee Name</th>
                  <th style = {{color: "white"}}>Manager Name</th>
                  <th style = {{color: "white"}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(request => (
                  <tr
                    onClick={() => this.onRowClick(request)}
                    key={request.staffId}
                  >
                    <td>{request.staffId}</td>
                    <td>{request.name}</td>
                    <td>{request.managerName}</td>
                    {this.checkStatus(request.phase6.status)}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </center>
      </div>
    );
  }
}
