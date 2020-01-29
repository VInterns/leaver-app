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
                console.log(data);
                this.setState({ data: data });
            })
        })
    }
    render() {
        return (<Table className='container'>
            <thead>
                <tr>
                    <th>Staff Id</th>
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
                            <tr key={index}>
                                <td>{value.id}</td>
                                <td>{value.managerName}</td>
                                <td>{value.phase1}</td>
                                <td>{value.phase2}</td>
                                <td>{value.phase3}</td>
                                <td>{value.phase4}</td>
                                <td>{value.phase5}</td>
                                <td>{value.phase6}</td>
                                <td>{value.phase7}</td>

                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>)
    }
}