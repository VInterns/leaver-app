import React from "react";
import {
    Table
} from "react-bootstrap";
import "./ast.css";

/////////////////////////////////////////////////////////////////////////
const API = "http://localhost:8080/api/";
const SEARCH = "resignations/";

/////////////////////////////////////////////////////////////////////////
export class ASTTableScreen extends React.Component {

    constructor(props){
        super(props);

        this.state = {

            requests : []

        }

        
        this.onRowClick = this.onRowClick.bind(this);
        this.fetchResignations = this.fetchResignations.bind(this)
    }

    componentDidMount() {
        this.fetchResignations();
    }


    onRowClick(resignation){
        this.props.history.push({
            pathname: "/ast-resignation",
            state: {resDetails: resignation}
        })
    }    


    fetchResignations(){
        fetch(API + SEARCH)
            .then((res) => {
                return res.json();
            })
            .then( (data) => {
                this.setState({
                    requests: data
                })
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
    }

    render(){
        const {requests} = this.state;
        return(
            <div className = "ast-page">
                <header className = "ast-header">
                    Application Security Team
                </header>
                <hr/>
                <div className = "ast-data">
                    <Table className = "ast" borderless>
                        <thead>
                            <tr>
                                <th>Staff ID</th>
                                <th>Employee Name</th>
                                <th>Manager Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(request => <tr onClick = {() => this.onRowClick(request)} key  = {request.staffId}>
                                <td>{request.staffId}</td>
                                <td>{request.name}</td>
                                <td>{request.managerName}</td>
                                {(request.phase6.status === "done") ? 
                                <td id = "done">{request.phase6.status}</td>: <td id = "pending">{request.phase6.status}</td>}
                            </tr>)}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}