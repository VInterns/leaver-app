import React, { Component } from 'react';
import { Table, Container, Header } from 'semantic-ui-react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export class HrViewScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };

    this.checkStatus = this.checkStatus.bind(this);
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

  checkRequestStatus(resignation) {
    if (
      resignation.phase3.status === 'new' &&
      resignation.phase4.status === 'new' &&
      resignation.phase6.status === 'new' &&
      resignation.phase7.status === 'new' &&
      resignation.phase8.status === 'new'
    ) {
      return 'new';
    } else if (
      resignation.phase3.status === 'done' &&
      resignation.phase4.status === 'done' &&
      resignation.phase6.status === 'done' &&
      resignation.phase7.status === 'done' &&
      resignation.phase8.status === 'done'
    ) {
      return 'done';
    } else {
      return 'pending';
    }
  }

  componentDidMount() {
    fetch('/api/resignations').then(res => {
      res.json().then(data => {
        this.setState({ data: data });
      });
    });
  }

  render() {
    return (
      <Container fluid className='bg-light p-5' style={{ height: '100vh' }}>
        <Header as='h3' className='text-center'>Human Resources Team</Header>
        <div className='row rounded border bg-white p-5'>
          <div className='row'>
            <div className='col d-flex flex-row'>
              <ReactHTMLTableToExcel
                id='test-table-xls-button'
                className='download-table-xls-button ui basic button'
                table='hr-table'
                filename='Resignations - HR'
                sheet='resignations'
                buttonText='Export Table'
              />
            </div>
          </div>
          <Table celled className='table-hover mb-3' id='hr-table'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Staff ID</Table.HeaderCell>
                <Table.HeaderCell>Employee Name</Table.HeaderCell>
                <Table.HeaderCell>Last Working Day</Table.HeaderCell>
                <Table.HeaderCell>Manager Name</Table.HeaderCell>
                <Table.HeaderCell>Resignation Request</Table.HeaderCell>
                <Table.HeaderCell>Customer Care</Table.HeaderCell>
                <Table.HeaderCell>Work Force</Table.HeaderCell>
                <Table.HeaderCell>CC Consumer Activation</Table.HeaderCell>
                <Table.HeaderCell>Application Security</Table.HeaderCell>
                <Table.HeaderCell>Corporate Security</Table.HeaderCell>
                <Table.HeaderCell>Enterprise Logistics</Table.HeaderCell>
                <Table.HeaderCell>Security Hardware Team</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.data.map((value, index) => {
                return (
                  <Table.Row
                    onClick={() => {
                      this.props.history.push(
                        `/resignations-details?id=${value.staffId}`
                      );
                    }}
                    key={index}
                  >
                    <Table.Cell>{value.staffId} </Table.Cell>
                    <Table.Cell>{value.name}</Table.Cell>
                    <Table.Cell>{value.phase1.lastWorkDay}</Table.Cell>
                    <Table.Cell>{value.managerName}</Table.Cell>
                    {this.checkStatus(this.checkRequestStatus(value))}
                    {this.checkStatus(value.phase2.status)}
                    {this.checkStatus(value.phase3.status)}
                    {this.checkStatus(value.phase4.status)}
                    {this.checkStatus(value.phase6.status)}
                    {this.checkStatus(value.phase8.status)}
                    {this.checkStatus(value.phase5.status)}
                    {this.checkStatus(value.phase7.status)}
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </Container>
    );
  }
}
