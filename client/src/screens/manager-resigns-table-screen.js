import React from "react";
import { Table } from 'react-bootstrap';

import {store} from '../App';

const API = '/api/resignations/';
const SEARCH = '/myresigns/'

/////////////////////////////////////////////////////////////////////////
export class ManagerResignationsTableScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {

            requests: [],
            createdby: store.getState().username,
        }

        this.clickButton = this.clickButton.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
        this.fetchRequestsData = this.fetchRequestsData.bind(this);
    }

    componentDidMount() {
        this.fetchRequestsData();
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
    
    clickButton(req) {
        this.props.history.push({
            pathname: "/resign",
            state: { detail: req }
        })
    }

    fetchRequestsData() {
        // this.setState({ ...this.state });
        fetch(API +  SEARCH + this.state.createdby) //this.state.createdby"admin@hr.com"
            .then((res) => {
                return res.json();
            }).then(data => {
                this.setState({ requests: data })
            })
            .catch((err) => {
                throw err;
            })
    }

    render() {
        const { requests } = this.state;
        return (
            <div className = "container">
                <center style = {{margin: "25px"}}>
                    <header>
                        <hr/>
                        <h3>Work Force Team</h3>
                        <hr/>
                    </header>    
                    <div>
                        <Table bordered hover striped>
                        <thead>
                            <tr style = {{backgroundColor: "#BE0002"}}>
                                <th className = "text-white">Staff ID</th>
                                <th className = "text-white">Leaver Name</th>
                                <th className = "text-white">Manager Name</th>
                                <th className = "text-white">Last Working Day</th>
                                <th className = "text-white">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(request => <tr onClick={() => this.clickButton(request)} key={request.staffId}>
                                <td>{request.staffId}</td>
                                <td>{request.name}</td>
                                <td>{request.managerName}</td>
                                <td>{request.phase1.lastWorkDay}</td>
                                {this.checkStatus(request.status)}
                            </tr>)}
                        </tbody>
                    </Table>
                </div>
                </center>
            </div>
        )
    }
}
