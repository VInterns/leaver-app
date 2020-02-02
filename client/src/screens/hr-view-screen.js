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
        fetch('http://localhost:8080/api/resignations').then((res) => {
            res.json().then((data) => {
                this.setState({ data: data });
            })
        })
    }
    render() {
        return (<Table bordered striped hover className='container'>
            <thead>
                <tr>
                    <th>Staff ID</th>
                    <th>Manager Name</th>
                    <th>Phase 1</th>
                    <th>Phase 2</th>
                    <th>Phase 3</th>
                    <th>Phase 4</th>
                    <th>Phase 5</th>
                    <th>Phase 6</th>
                    <th>Phase 7</th>

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
        </Table >)
    }
}