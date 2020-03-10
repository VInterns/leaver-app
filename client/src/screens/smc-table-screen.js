import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Table, Container, Header } from 'semantic-ui-react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

/////////////////////////////////////////////////////////////////////////
const API = '/api/';
const SEARCH = 'resignations/';

/////////////////////////////////////////////////////////////////////////

export class SMCTableScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resRrequests: []
    };

    this.onRowClick = this.onRowClick.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.getResignations = this.getResignations.bind(this);
  }

  componentDidMount() {
    this.getResignations();
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

  onRowClick(item) {
    this.props.history.push({
      pathname: '/smc-view',
      state: { detail: item }
    });
    // let phase1 = Object(item.phase1);
    // this.props.history.push(`/smc-view/${item.staffId}/${phase1.lastWorkDay}`);
  }

  getResignations() {
    fetch(API + SEARCH)
      .then(res => {
        return res.json();
      })
      .then(resignations => {
        this.setState({
          resRrequests: resignations
        });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    const { resRrequests } = this.state;
    return (
      <Container fluid className='bg-light p-5' style = {{height: '100vh'}}>
        <Header as = 'h3' className='text-center'>Customer Care (SMC)</Header>
        <div className='row'>
          <div className='offset-md-3 col-md-6 border bg-white rounded'>
            <Row className='mt-4'>
              <Col className = 'd-flex flex-row'>
                <ReactHTMLTableToExcel
                  id='test-table-xls-button'
                  className='download-table-xls-button ui basic button'
                  table='customer-care-table'
                  filename='Resignations - Customer Care'
                  sheet='resignations'
                  buttonText='Export Table'
                />
              </Col>
            </Row>
            <hr/>
            <Table celled className='table-hover mb-3' id = 'customer-care-table'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Staff ID</Table.HeaderCell>
                  <Table.HeaderCell>Employee Name</Table.HeaderCell>
                  <Table.HeaderCell>Manager Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {resRrequests.map(resignation => (
                  <Table.Row
                    onClick={() => this.onRowClick(resignation)}
                    key={resignation.staffId}
                  >
                    <td>{resignation.staffId}</td>
                    <td>{resignation.name}</td>
                    <td>{resignation.managerName}</td>
                    {this.checkStatus(resignation.phase2.status)}
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
