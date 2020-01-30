import React from 'react';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import { Input, Button, Table } from 'reactstrap';

const user = {
    name: 'alaa'
};




export class SMCTable extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            data: [],
        };

        fetch('http://localhost:8080/api/resignations/smc')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson);
                this.state.data = myJson;
            });
    }






    render() {

        return (

            <div className="App">
                <header className="App-header" >
                    Customare Care (SMC)
                </header>

                <br />
                <hr />
                <div className="row">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Employee Name</th>
                                <th>Date of Requset</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tr>
                            <th>{this.state.data.name}</th>
                            <th>Employee Name</th>
                            <th>Date of Requset</th>
                            <th>Action</th>
                        </tr>
                        <tbody>

                            {

                                this.state.data.map((records, i) => {
                                    return (

                                        <tr>
                                            <li>{i}</li>
                                            {records.map((record, i) => {

                                                return (

                                                    <li>{record.name}</li>
                                                );

                                            })}


                                        </tr>

                                    );


                                })}



                        </tbody>
                    </Table>
                </div>


            </div>
        );
    }
}



/*

<tr>
    <th scope="row">2</th>
    <td>Jacob</td>
    <td>Thornton</td>
    <td>@fat</td>
</tr>


*/