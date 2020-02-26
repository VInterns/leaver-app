import React from 'react';
import { Table } from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

/////////////////////////////////////////////////////////////////////////
const API = '/api/';
const SEARCH = 'resignations/';

/////////////////////////////////////////////////////////////////////////

export class ELTTableScreen extends React.Component {
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

  onRowClick(resignation) {
    let phase1 = Object(resignation.phase1);
    let phase5 = Object(resignation.phase5);
    this.props.history.push({
      pathname: '/form-res',
      state: {
        resId: resignation.staffId,
        lastWorkDay: phase1.lastWorkDay,
        comment: phase5.comment
      }
    });
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
      <div className='container'>
        <center style={{ margin: '25px' }}>
          <header className='elt-header'>
            <hr />
            <h3>Enterprise Logistics Team</h3>
            <hr />
          </header>
          <div className='elt-data'>
            <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className='download-table-xls-button btn btn-outline-success btn-lg btn-block mt-3 mb-3'
              table='wf-table'
              filename='Resignations - Work Force'
              sheet='resignations'
              buttonText='Export Table as XLS'
            />
            <Table bordered hover striped responsive id='el-table'>
              <thead>
                <tr style={{ backgroundColor: '#BE0002' }}>
                  <th className='text-white'>Staff ID</th>
                  <th className='text-white'>Employee Name</th>
                  <th className='text-white'>Manager Name</th>
                  <th className='text-white'>Status</th>
                </tr>
              </thead>
              <tbody>
                {resRrequests.map(resignation => (
                  <tr
                    onClick={() => this.onRowClick(resignation)}
                    key={resignation.staffId}
                  >
                    <td>{resignation.staffId}</td>
                    <td>{resignation.name}</td>
                    <td>{resignation.managerName}</td>
                    {this.checkStatus(resignation.phase5.status)}
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
