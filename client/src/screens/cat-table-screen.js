import React, { Component } from 'react';
import axios from 'axios';
import { Table } from "reactstrap";



export class ConsumerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
        };
        this.getData();
    }

    //fetch all pending resignations
    getData() {
        var url = '/api/resignations/pending';
        axios.get(url)
            .then((retrieveData) => {
                this.setState({
                    Data: retrieveData.data,
                })
            })
    }
    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div className="container">
                <center style={{ margin: '25px' }}>
                    <header>
                        <hr/>
                        <h3>CC Consumer Activation</h3>
                        <hr/>
                    </header>
                    <div>
                        <Table bordered hover>
                            <thead>
                                <tr style={{ backgroundColor: "#BE0002" }} >
                                    <th style={{ color: "white" }} >Leaver Name</th>
                                    <th style={{ color: "white" }}>Manager Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Data.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.managerName}</td>
                                        <td>< button className="btn btn-primary" style={{
                                            backgroundColor: "#BE0002"
                                        }} onClick={() => {
                                            this.props.history.push('cc-consumer-activation?id=' + item.staffId)
                                        }
                                        } > Fill Forum</button ></td>
                                    </tr>
                                })}
                            </tbody >
                        </Table >
                    </div>
                </center>
            </div>
        );
    }
}
