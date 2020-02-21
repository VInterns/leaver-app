import React from "react";
import {Table} from "react-bootstrap";

/////////////////////////////////////////////////////////////////////////
export class LeaverDetails extends React.Component{
    
    render(){

        let leaver = Object(this.props.leaverDetail.leaverInfo);

        return(
            <div>
                <header>
                    <hr/>
                    <h3>{"Leaver Details"}</h3>
                    <hr/>
                </header>
                <Table bordered hover>
                    <tbody>
                        <tr>
                            <td><span style = {{fontWeight: "bold"}}>Staff ID:</span> {leaver.staffId}</td>
                            <td><span style = {{fontWeight: "bold"}}>SAP Stuff ID:</span> {leaver.staffId}</td>
                        </tr>
                        <tr>
                            <td><span style = {{fontWeight: "bold"}} >Leaver Name:</span> {leaver.name}</td>
                            <td><span style = {{fontWeight: "bold"}} >Manager:</span> {leaver.managerName}</td>
                        </tr>
                        <tr>
                            <td><span style = {{fontWeight: "bold"}} >Department:</span> {leaver.department}</td>
                            <td><span style = {{fontWeight: "bold"}} >Care Center:</span> {leaver.careCenter}</td>
                        </tr>
                        <tr>
                            <td><span style = {{fontWeight: "bold"}} >Job Title:</span> {leaver.jobTitle}</td>
                            <td><span style = {{fontWeight: "bold"}} >Hiring Date:</span> {leaver.hiringDate}</td>
                        </tr>
                        <tr>
                            <td><span style = {{fontWeight: "bold"}} >Mobile Number:</span> {"+" + leaver.mobile}</td>
                            <td><span style = {{fontWeight: "bold"}} >Last Working Day:</span> {this.props.leaverDetail.lastDay}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}