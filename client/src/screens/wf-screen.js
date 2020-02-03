import React from "react";
import {
    Table
} from 'react-bootstrap';
import './wf-screen.css';
const API = 'http://localhost:8080/api/resignations';
const SEARCH = '/wf/fetchRequests'

/////////////////////////////////////////////////////////////////////////
export class WorkForceScreen extends React.Component{


    constructor(props) {
        super(props);
        this.state = {

            requests: []
        }

        this.clickButton = this.clickButton.bind(this);
        this.fetchRequestsData = this.fetchRequestsData.bind(this);
    }

    componentDidMount() {
        this.fetchRequestsData();
        //this.timer = setInterval(() => this.fetchRequestsData(), 1000000000);
    }

    clickButton(req){
      this.props.history.push({
          pathname: "/wf-view-detail",
          state: {detail : req}
      })
    }

    fetchRequestsData() {
        this.setState({...this.state});
        fetch(API + SEARCH )
            .then( (res) => {
                return res.json();
                // console.log(res.json())
                // const retRequests = res.data;
                // console.log(res)
                // this.setState({requests: retRequests})
            }).then(data=>{
                console.log(data)
                this.setState({requests: data})
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        const {requests} = this.state;
            return (
                <div className = "request">
                    <h1 id = "wf">WF Table</h1>
                    <Table id = "requests">
                        <tbody>
                        <tr>
                            <th>Staff ID</th>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                        {requests.map(request=> <tr onClick = {() => this.clickButton(request)} key = {request.staffId}>
                        <td>{request.staffId}</td>
                        <td>{request.name}</td>
                        <td>{request.status}</td>
                        </tr>)}
                        </tbody>
                    </Table>
                </div>
            )
        }
}

/////////////////////////////////////////////////////////////////////////