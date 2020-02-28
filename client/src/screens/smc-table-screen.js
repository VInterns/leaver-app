import React from "react";
import { Table } from "react-bootstrap";

/////////////////////////////////////////////////////////////////////////
const API = "/api/";
const SEARCH = "resignations/";

/////////////////////////////////////////////////////////////////////////

export class SMCTableScreen extends React.Component {

    constructor(props) {
        super(props);


        this.state = {

            resRrequests: []

        }

        this.onRowClick = this.onRowClick.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
        this.getResignations = this.getResignations.bind(this);
    }


    componentDidMount() {
        this.getResignations();
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

    onRowClick(item) {
        this.props.history.push({
            pathname: "/smc-view",
            state: { detail: item }
        })
        // let phase1 = Object(item.phase1);
        // this.props.history.push(`/smc-view/${item.staffId}/${phase1.lastWorkDay}`);
    }

    getResignations() {
        fetch(API + SEARCH)
            .then((res) => {
                return res.json();
            })
            .then((resignations) => {
                this.setState({
                    resRrequests: resignations
                })
            })
            .catch((err) => {
                throw err;
            })
    }


    render() {
        const { resRrequests } = this.state;
        return (
            <div className = "container">
                <center style = {{margin: "25px"}}>
                    <header className="elt-header">
                        <hr/>
                        <h3>Customer Care (SMC)</h3>
                        <hr/>
                    </header>
                    <div className="elt-data">
                        <Table bordered hover striped responsive>
                            <thead>
                                <tr style = {{backgroundColor: "#BE0002"}}>
                                    <th className = "text-white">Staff ID</th>
                                    <th className = "text-white">Employee Name</th>
                                    <th className = "text-white">Manager Name</th>
                                    <th className = "text-white">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resRrequests.map(resignation => <tr onClick={() => this.onRowClick(resignation)} key={resignation.staffId}>
                                    <td>{resignation.staffId}</td>
                                    <td>{resignation.name}</td>
                                    <td>{resignation.managerName}</td>
                                    {this.checkStatus(resignation.phase2.status)}
                                </tr>)}
                            </tbody>
                        </Table>
                    </div>
                </center>
            </div>
        )
    }


}