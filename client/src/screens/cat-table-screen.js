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
        this.onRowClick = this.onRowClick.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
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

    onRowClick(item){
        this.props.history.push(`/cc-consumer-activation/${item.staffId}/${item.phase1.lastWorkDay}`)
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
                                    <th style={{ color: "white" }} >Staff ID</th>
                                    <th style={{ color: "white" }}>Employee Name</th>
                                    <th style={{ color: "white" }}>Manager Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Data.map((item, index) => {
                                    return <tr key={index} onClick = {() => this.onRowClick(item)}>
                                        <td>{item.staffId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.managerName}</td>
                                        {this.checkStatus(item.phase4.status)}
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
