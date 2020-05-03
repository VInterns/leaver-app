import React from 'react';
import { Table, Container, Header } from 'semantic-ui-react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

/////////////////////////////////////////////////////////////////////////
const API = '/api/';
const SEARCH = 'resignations/';

/////////////////////////////////////////////////////////////////////////
export class ASTTableScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: []
    };

    this.onRowClick = this.onRowClick.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.fetchResignations = this.fetchResignations.bind(this);
  }

  componentDidMount() {
    this.fetchResignations();
  }

  checkStatus(status) {
    switch (status) {
      case 'pending':
        return (
          <Table.Cell
            style={{
              color: '#BE0002',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Table.Cell>
        );
      case 'done':
        return (
          <Table.Cell
            style={{
              color: '#5cb85c',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Table.Cell>
        );
      default:
        return (
          <Table.Cell
            style={{
              color: '#34a1fd',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Table.Cell>
        );
    }
  }

  onRowClick(resignation) {
    this.props.history.push({
      pathname: '/ast-resignation',
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
        throw err;
      });
  }

  render() {
    const { requests } = this.state;
    return (
      <Container fluid className='bg-light p-5' style={{ height: '100vh' }}>
        <Header as='h3' className='text-center'>Application Security Team</Header>
        <div className='row'>
          <div className='offset-md-3 col-md-6 border bg-white rounded'>
            <div className='row mt-4'>
              <div className='col d-flex flex-row'>
                <ReactHTMLTableToExcel
                  id='test-table-xls-button'
                  className='download-table-xls-button ui basic button'
                  table='as-table'
                  filename='Resignations - Application Security'
                  sheet='resignations'
                  buttonText='Export Table'
                />
              </div>
            </div>
            <hr />
            <Table celled className='table-hover mb-3' id='as-table'>
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
                    onClick={() => this.onRowClick(request)}
                    key={request.staffId}
                  >
                    <Table.Cell>{request.staffId}</Table.Cell>
                    <Table.Cell>{request.name}</Table.Cell>
                    <Table.Cell>{request.managerUsername}</Table.Cell>
                    {this.checkStatus(request.phase6.status)}
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
