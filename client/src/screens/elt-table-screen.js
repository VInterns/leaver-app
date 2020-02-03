import React from "react";
import { Table } from "react-bootstrap";

/////////////////////////////////////////////////////////////////////////
const API = "/api/";
const SEARCH = "resignations/";

/////////////////////////////////////////////////////////////////////////

export class ELTTableScreen extends React.Component {

    constructor(props) {
        super(props);


        this.state = {

            resRrequests: []

        }

        this.onRowClick = this.onRowClick.bind(this);
        this.getResignations = this.getResignations.bind(this);
    }


    componentDidMount() {
        this.getResignations();
    }


    onRowClick(searchId) {
        this.props.history.push({
            pathname: "/form-res",
            state: { resId: searchId }
        })
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
                console.log(err);
                throw err;
            })
    }


    render() {
        const { resRrequests } = this.state;
        return (
            <div className="elt-page">
                <header className="elt-header">
                    Enterprise Logistics Team
                </header>
                <hr />
                <div className="elt-data">
                    <Table bordered hover striped responsive>
                        <thead>
                            <tr>
                                <th>Staff ID</th>
                                <th>Employee Name</th>
                                <th>Manager Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resRrequests.map(resignation => <tr onClick={() => this.onRowClick(resignation.staffId)} key={resignation.staffId}>
                                <td>{resignation.staffId}</td>
                                <td>{resignation.name}</td>
                                <td>{resignation.managerName}</td>
                                <td>{resignation.phase5.status}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }


}