import React, { Component } from 'react';
import { Table } from 'reactstrap';

export class HrViewScreen extends Component {
    constructor() {
        super();
        this.state = {
            data: []

        };

        this.checkStatus = this.checkStatus.bind(this);
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

    checkRequestStatus (resignation) {
        if (resignation.phase2.status === "new" && resignation.phase3.status === "new" && resignation.phase4.status === "new" && resignation.phase5.status === "new" && resignation.phase6.status === "new" && resignation.phase7.status === "new" ) {
            return "new";
        } else if (resignation.phase2.status === "done" && resignation.phase3.status === "done" && resignation.phase4.status === "done" && resignation.phase5.status === "done" && resignation.phase6.status === "done" && resignation.phase7.status === "done" ) {
            return "done";
        } else {
            return "pending";
        }
    }

    componentDidMount() {
        fetch('/api/resignations').then((res) => {
            res.json().then((data) => {
                this.setState({ data: data });
            })
        })
    }

    render() {
        return (
            <div className = "container-fluid">
                <center style = {{margin: "25px"}}>
                <header className="ast-header"> 
                    <hr/>
                    <h3>Human Resources Team</h3>
                    <hr/>
                </header>
                <Table bordered striped hover>
                <thead>
                    <tr style = {{backgroundColor: "#BE0002", "whiteSpace": "nowrap"}}>
                        <th className = "text-white">Staff ID</th>
                        <th className = "text-white">Employee Name</th>
                        <th className = "text-white">Last Working Day</th>
                        <th className = "text-white">Manager Name</th>
                        <th className = "text-white">Resignation Request</th>
                        <th className = "text-white">Customer Care</th>
                        <th className = "text-white">Work Force</th>
                        <th className = "text-white">CC Consumer Activation</th>
                        <th className = "text-white">Enterprise Logistics</th>
                        <th className = "text-white">Application Security</th>
                        <th className = "text-white">Security Hardware Team</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.data.map((value, index) => {
                            return (
                                <tr onClick={() => {
                                    this.props.history.push(`/resignations-details?id=${value.staffId}`)
                                }} key={index}>
                                    <td>{value.staffId} </td>
                                    <td>{value.name}</td>
                                    <td>{value.phase1.lastWorkDay}</td>
                                    <td >{value.managerName}</td>
                                    {this.checkStatus(this.checkRequestStatus(value))}
                                    {this.checkStatus(value.phase2.status)}
                                    {this.checkStatus(value.phase3.status)}
                                    {this.checkStatus(value.phase4.status)}
                                    {this.checkStatus(value.phase5.status)}
                                    {this.checkStatus(value.phase6.status)}
                                    {this.checkStatus(value.phase7.status)}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table >
            </center>
        </div>
        )
    }
}