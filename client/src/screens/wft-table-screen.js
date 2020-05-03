import React from 'react';
import { Container, Table, Header } from 'semantic-ui-react';
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
    // this.setState({ ...this.state });
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
      <Container fluid className="p-5 bg-light" style={{ height: '100vh' }}>
        <Header as='h3' className='text-center'>Work Force Team</Header>
        <div className='row'>
          <div className='offset-md-3 col-md-6 border rounded bg-white'>
            <div className='row mt-4'>
              <div className='col d-flex flex-row'>
                <ReactHTMLTableToExcel
                  id='test-table-xls-button'
                  className='download-table-xls-button ui basic button'
                  table='wf-table'
                  filename='Resignations - Work Force'
                  sheet='resignations'
                  buttonText='Export Table'
                />
              </div>
            </div>
            <hr />
            <Table celled className='table-hover mb-3' id='wf-table'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Staff ID</Table.HeaderCell>
                  <Table.HeaderCell>Employee Name</Table.HeaderCell>
                  <Table.HeaderCell>Manager</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {requests.map(request => (
                  <Table.Row
                    onClick={() => this.clickButton(request)}
                    key={request.staffId}
                  >
                    <Table.Cell>{request.staffId}</Table.Cell>
                    <Table.Cell>{request.name}</Table.Cell>
                    <Table.Cell>{request.managerUsername}</Table.Cell>
                    {this.checkStatus(request.phase3.status)}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </Container>
    );
  }
}
