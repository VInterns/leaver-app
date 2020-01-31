import React, { Component } from 'react';
import { Table } from 'reactstrap';
import querString from 'query-string';
export class ResignationsScreen extends Component {
    constructor() {
        super();
        this.state = {
            data: null

        };
    }

    componentWillMount() {
        console.log(

            this.props.history.location
        )
        let url = this.props.location.search;
        let params = querString.parse(url);
        const id = params.id;

        fetch(`http://localhost:8080/api/resignations-details/${id}`).then((res) => {
            res.json().then((data) => {
                console.log(data);
                this.setState({ data: data });
            })
        })
    }
    render() {
        return (
            <>
                <h3 className='container'>Phase 1 </h3>
                <Table bordered striped hover className='container' >
                    <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Returned Headset</th>
                            <th>Returned Keys</th>
                            <th>Returned 3ohda</th>
                            <th>3ohada Type</th>
                            <th>Comment</th>

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.data && <tr>
                            <td>{this.state.data.staffId} </td>
                            <td>{this.state.data.managerName}</td>
                            <td>{this.state.data.phase1.status}</td>
                            <td>{this.state.data.phase1.headSet}</td>
                            <td>{this.state.data.phase1.keys}</td>
                            <td>{this.state.data.phase1.aohda}</td>
                            <td>{this.state.data.phase1.aohadaType}</td>
                            <td>{this.state.data.phase1.comment}</td>
                        </tr>
                        }

                    </tbody>
                </Table>
                <h3 className='container'>Phase 2 </h3>
                <Table bordered striped hover className='container' >
                    <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Returned Headset</th>
                            <th>Returned Keys</th>
                            <th>Returned 3ohda</th>
                            <th>3ohada Type</th>
                            <th>Comment</th>

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.data && <tr>
                            <td>{this.state.data.staffId} </td>
                            <td>{this.state.data.managerName}</td>
                            <td>{this.state.data.phase2.status}</td>
                            <td>{this.state.data.phase2.headSet}</td>
                            <td>{this.state.data.phase2.keys}</td>
                            <td>{this.state.data.phase2.aohda}</td>
                            <td>{this.state.data.phase2.aohadaType}</td>
                            <td>{this.state.data.phase2.comment}</td>
                        </tr>
                        }

                    </tbody>
                </Table>
                <h3 className='container'>Phase 3 </h3>
                <Table bordered striped hover className='container' >
                    <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Returned Headset</th>
                            <th>Returned Keys</th>
                            <th>Returned 3ohda</th>
                            <th>3ohada Type</th>
                            <th>Comment</th>

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.data && <tr>
                            <td>{this.state.data.staffId} </td>
                            <td>{this.state.data.managerName}</td>
                            <td>{this.state.data.phase3.status}</td>
                            <td>{this.state.data.phase3.headSet}</td>
                            <td>{this.state.data.phase3.keys}</td>
                            <td>{this.state.data.phase3.aohda}</td>
                            <td>{this.state.data.phase3.aohadaType}</td>
                            <td>{this.state.data.phase3.comment}</td>
                        </tr>
                        }

                    </tbody>
                </Table>
                <h3 className='container'>Phase 4 </h3>
                <Table bordered striped hover className='container' >
                    <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Returned Headset</th>
                            <th>Returned Keys</th>
                            <th>Returned 3ohda</th>
                            <th>3ohada Type</th>
                            <th>Comment</th>

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.data && <tr>
                            <td>{this.state.data.staffId} </td>
                            <td>{this.state.data.managerName}</td>
                            <td>{this.state.data.phase4.status}</td>
                            <td>{this.state.data.phase4.headSet}</td>
                            <td>{this.state.data.phase4.keys}</td>
                            <td>{this.state.data.phase4.aohda}</td>
                            <td>{this.state.data.phase4.aohadaType}</td>
                            <td>{this.state.data.phase4.comment}</td>
                        </tr>
                        }

                    </tbody>
                </Table>
                <h3 className='container'>Phase 5 </h3>
                <Table bordered striped hover className='container' >
                    <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Returned Headset</th>
                            <th>Returned Keys</th>
                            <th>Returned 3ohda</th>
                            <th>3ohada Type</th>
                            <th>Comment</th>

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.data && <tr>
                            <td>{this.state.data.staffId} </td>
                            <td>{this.state.data.managerName}</td>
                            <td>{this.state.data.phase5.status}</td>
                            <td>{this.state.data.phase5.headSet}</td>
                            <td>{this.state.data.phase5.keys}</td>
                            <td>{this.state.data.phase5.aohda}</td>
                            <td>{this.state.data.phase5.aohadaType}</td>
                            <td>{this.state.data.phase5.comment}</td>
                        </tr>
                        }

                    </tbody>
                </Table>
                <h3 className='container'>Phase 6 </h3>
                <Table bordered striped hover className='container' >
                    <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Returned Headset</th>
                            <th>Returned Keys</th>
                            <th>Returned 3ohda</th>
                            <th>3ohada Type</th>
                            <th>Comment</th>

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.data && <tr>
                            <td>{this.state.data.staffId} </td>
                            <td>{this.state.data.managerName}</td>
                            <td>{this.state.data.phase6.status}</td>
                            <td>{this.state.data.phase6.headSet}</td>
                            <td>{this.state.data.phase6.keys}</td>
                            <td>{this.state.data.phase6.aohda}</td>
                            <td>{this.state.data.phase6.aohadaType}</td>
                            <td>{this.state.data.phase6.comment}</td>
                        </tr>
                        }

                    </tbody>
                </Table>
                <h3 className='container'>Phase 7 </h3>
                <Table bordered striped hover className='container' >
                    <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Returned Headset</th>
                            <th>Returned Keys</th>
                            <th>Returned 3ohda</th>
                            <th>3ohada Type</th>
                            <th>Comment</th>

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.data && <tr>
                            <td>{this.state.data.staffId} </td>
                            <td>{this.state.data.managerName}</td>
                            <td>{this.state.data.phase7.status}</td>
                            <td>{this.state.data.phase7.headSet}</td>
                            <td>{this.state.data.phase7.keys}</td>
                            <td>{this.state.data.phase7.aohda}</td>
                            <td>{this.state.data.phase7.aohadaType}</td>
                            <td>{this.state.data.phase7.comment}</td>
                        </tr>
                        }

                    </tbody>
                </Table>

            </>

        );


    }
}