import React from 'react';
import { Table } from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const API = '/api/resignations';
const SEARCH = '/wf/fetchRequests';

/////////////////////////////////////////////////////////////////////////
export class WorkForceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
    };

    this.clickButton = this.clickButton.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.fetchRequestsData = this.fetchRequestsData.bind(this);
  }

  componentDidMount() {
    this.fetchRequestsData();
  }

  checkStatus(status) {
    switch (status) {
      case 'pending':
        return (
          <td
            style={{
              color: '#BE0002',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </td>
        );
      case 'done':
        return (
          <td
            style={{
              color: '#5cb85c',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </td>
        );
      default:
        return (
          <td
            style={{
              color: '#34a1fd',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </td>
        );
    }
  }

  clickButton(req) {
    this.props.history.push({
      pathname: '/wf-view-detail',
      state: { detail: req }
    });
  }

  fetchRequestsData() {
    this.setState({ ...this.state });
    fetch(API + SEARCH)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ requests: data });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    const { requests } = this.state;
    return (
      <div className='container'>
        <center style={{ margin: '25px' }}>
          <header>
            <hr />
            <h3>Work Force Team</h3>
            <hr />
          </header>
          <div>
            <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className='download-table-xls-button'
              table='wf-table'
              filename='Resignations - Work Force'
              sheet='resignations'
              buttonText='Download as XLS'
            />
            <Table bordered hover striped id='wf-table'>
              <thead>
                <tr style={{ backgroundColor: '#BE0002' }}>
                  <th className='text-white'>Staff ID</th>
                  <th className='text-white'>Employee Name</th>
                  <th className='text-white'>Manager Name</th>
                  <th className='text-white'>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(request => (
                  <tr
                    onClick={() => this.clickButton(request)}
                    key={request.staffId}
                  >
                    <td>{request.staffId}</td>
                    <td>{request.name}</td>
                    <td>{request.managerName}</td>
                    {this.checkStatus(request.phase3.status)}
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
