import React, { Component } from 'react';
import { Table } from 'reactstrap';

export class HrViewScreen extends Component {
    constructor() {
        super();
        this.state = {
            data: []

        };
    }
    
    componentWillMount() {
        fetch('/api/resignations').then((res) => {
            res.json().then((data) => {
                this.setState({ data: data });
            })
        })
    }

    render() {
        return (
            <div className = "container">
                <center style = {{margin: "25px"}}>
                <header className="ast-header"> 
                    <hr/>
                    <h3>Human Resources Team</h3>
                    <hr/>
                </header>
                <Table bordered striped hover>
                <thead>
                    <tr style = {{backgroundColor: "#BE0002"}}>
                        <th className = "text-white">Staff ID</th>
                        <th className = "text-white">Manager Name</th>
                        <th className = "text-white">Phase 1</th>
                        <th className = "text-white">Phase 2</th>
                        <th className = "text-white">Phase 3</th>
                        <th className = "text-white">Phase 4</th>
                        <th className = "text-white">Phase 5</th>
                        <th className = "text-white">Phase 6</th>
                        <th className = "text-white">Phase 7</th>
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
                                    <td >{value.managerName}</td>
                                    <td>{value.phase1.status}</td>
                                    <td>{value.phase2.status}</td>
                                    <td>{value.phase3.status}</td>
                                    <td>{value.phase4.status}</td>
                                    <td>{value.phase5.status}</td>
                                    <td>{value.phase6.status}</td>
                                    <td>{value.phase7.status}</td>
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