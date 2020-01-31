import React, { Suspense } from 'react';
import { Input, Button, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom'



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

                // this.state.data = myJson;
                this.setState({ data: myJson });
                console.log(this.state.data);
            });
    }




    btnView = (e) => {


        console.log('test');
        this.props.history.push('/smc', {
            staffID: e.target.id
        });

    }


    render() {
        const mystyle = {
            padding: '3px',
            width: '50%'
        };

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
                        <tbody>

                            {this.state.data.map((item, key) => {

                                return (
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.date}</td>
                                        <td> <Button color="primary" id={item.staffID} onClick={this.btnView} className="px-0" style={mystyle}> View </Button></td>
                                    </tr>
                                )

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