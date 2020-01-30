import React, { Component } from 'react';
import axios from 'axios';
import { Table } from "reactstrap";



export class consumerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
        };
        var url = 'http://localhost:8080/api/consumer-activation/pending';
        axios.get(url)
            .then((retrieveData) => {
                this.setState({
                    Data: retrieveData.data,
                })
            })
    }
    render() {
        const dataMongo = this.state.Data.map((item, index) => {
            // var Array = ['Leaver Name: ', item.leavername, '/ Manager Name: ', item.manager, ''].join(' ');
            return <tr>
                <td>Leaver Name:  {item.leavername}</td>
                <td>Manager:  {item.manager}</td>
                <td>< button className="btn btn-primary" onClick={() => {
                    this.props.history.push('cc-consumer-activation?id=' + item.staffid)
                }
                } > Fill Forum</button ></td>
            </tr>

                ;
        })
        return (
            <div className="container">
                <center style={{ margin: '25px' }}>
                    <div>
                        <Table>
                            <tbody>
                                {dataMongo}
                            </tbody >
                        </Table >
                    </div>
                </center>
            </div>
        );
    }
}
