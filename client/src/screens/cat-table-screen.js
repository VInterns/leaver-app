import React, { Component } from 'react';
import axios from 'axios';
import { Table, Container, Header } from "semantic-ui-react";
import { Row, Col } from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export class ConsumerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: []
    };

    this.getData();
    this.onRowClick = this.onRowClick.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
  }

  //fetch all pending resignations
  getData() {
    var url = '/api/resignations/pending';
    axios.get(url).then(retrieveData => {
      this.setState({
        Data: retrieveData.data
      });
    });
  }

  componentDidMount() {
    this.getData();
  }

  onRowClick(item) {
    this.props.history.push(
      `/cc-consumer-activation/${item.staffId}/${item.phase1.lastWorkDay}`
    );
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

  render() {
    return (
      <Container fluid className='bg-light p-5' style={{ height: '100vh' }}>
        <Header as='h3' className='text-center'>CC Consumer Activation</Header>
        <div className='row'>
          <div className='offset-md-3 col-md-6 border bg-white rounded'>
            <Row className='mt-4'>
              <Col className='d-flex flex-row'>
                <ReactHTMLTableToExcel
                  id='test-table-xls-button'
                  className='download-table-xls-button ui basic button'
                  table='conumer-activation-table'
                  filename='cc-consumer-activation-table'
                  sheet='resignations'
                  buttonText='Export Table'
                />
              </Col>
            </Row>
            <hr/>
            <Table celled className = 'table-hover mb-3' id='conumer-activation-table'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Staff ID</Table.HeaderCell>
                  <Table.HeaderCell>Employee Name</Table.HeaderCell>
                  <Table.HeaderCell>Manager Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.Data.map((item, index) => {
                  return (
                    <Table.Row key={index} onClick={() => this.onRowClick(item)}>
                      <Table.Cell>{item.staffId}</Table.Cell>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.managerName}</Table.Cell>
                      {this.checkStatus(item.phase4.status)}
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        </div>
      </Container>
    );
  }
}
