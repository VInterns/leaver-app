import React, { Component } from 'react';
import axios from 'axios';
import Zoom from 'react-reveal/Zoom';



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
            var Array = ['Name: ', item.name, '/ email: ', item.email, ''].join(' ');
            return <p key={index}>{Array}
                <button className="btn btn-primary" onClick={() => {
                    this.props.history.push('cc-consumer-activation?id=' + item.id)
                }} >Fill Forum</button>
            </p>;
        })
        return (
            <div className="container">
                <center style={{ margin: '25px' }}>
                    <div>
                        {dataMongo}
                    </div>
                </center>
            </div>
        );
    }
}
