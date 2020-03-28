import React from 'react';
import { Table, Container, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const API = '/api/resignations/';
const SEARCH = '/myresigns/';
const DELETE = 'delete-request/'; 
/////////////////////////////////////////////////////////////////////////
export class ManagerResignationsTableScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      createdby: this.props.createdby
    };

    this.clickButton = this.clickButton.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.fetchRequestsData = this.fetchRequestsData.bind(this);
  }

  static mapStateToProps(state) {
    return {
      createdby: state.auth.username
    };
  }

  componentDidMount() {
    this.fetchRequestsData();
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
      case 'Updated':
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

  clickButton(req) {
    this.props.history.push({
      pathname: '/update-resignation',
      state: { resignReq: req }
    });
  }

  fetchRequestsData() {
    // this.setState({ ...this.state });
    fetch(API + SEARCH + this.state.createdby)
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

  deleteRequest(req){
    fetch(API + DELETE + req.staffId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({request:req})
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.status === 200) {
          toast.success('Resignation Request successfully deleted');
          setTimeout(function() { //Start the timer
            window.location.reload(); //After 1 second, set render to true
        },1000)
         
        }
        else if (response.status === 409) {
          toast.error("Error in db");
        }
        else {
          toast.error('Resignation Request could not be deleted');
          return undefined;
        }
      })
      .catch(function (error) {
        toast.error('Delete Fail');
      });
  }

  render() {
    const { requests } = this.state;
    return (
      <Container fluid className='bg-light p-5' style={{ height: '100vh' }}>
        <ToastContainer/>
        <Header as='h3' className='text-center'>My Resignations</Header>
        <div className='row'>
          <div className='offset-md-3 col-md-6 border bg-white rounded'>
            <div className='row mt-4'>
              <div className='col d-flex flex-row'>
                <ReactHTMLTableToExcel
                  id='test-table-xls-button'
                  className='download-table-xls-button ui basic button'
                  table='resignation'
                  filename='Manager - Resignations'
                  sheet='resignations'
                  buttonText='Export Table'
                />
              </div>
            </div>
            <hr/>
            <Table celled className = 'table-hover mb-3' id='resignation'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Staff ID</Table.HeaderCell>
                  <Table.HeaderCell>Leaver Name</Table.HeaderCell>
                  <Table.HeaderCell>Manager Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Working Day</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Cancel Request?</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {requests.map(request => (
                  <Table.Row
                    // onClick={() => this.clickButton(request)}
                    key={request.staffId}
                  >
                    <Table.Cell onClick={() => this.clickButton(request)}>{request.staffId}</Table.Cell>
                    <Table.Cell onClick={() => this.clickButton(request)}>{request.name}</Table.Cell>
                    <Table.Cell onClick={() => this.clickButton(request)}>{request.managerName}</Table.Cell>
                    <Table.Cell onClick={() => this.clickButton(request)}>{request.phase1.lastWorkDay}</Table.Cell>
                    <Table.Cell onClick={() => this.clickButton(request)}>{this.checkStatus(request.status)}</Table.Cell>
                    <Table.Cell>
                      <Button
                        variant='danger'
                        className = 'mb-3'
                        size='sm'
                        onClick={this.deleteRequest.bind(this,request)}
                        block
                      >
                        Cancel
                      </Button>
                    </Table.Cell>
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

export const ConnectedManagerResignScreen = connect(
  ManagerResignationsTableScreen.mapStateToProps
)(ManagerResignationsTableScreen);
