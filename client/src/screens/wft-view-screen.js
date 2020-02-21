import React from "react";
import {Table} from "react-bootstrap";
import {LeaverDetails} from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = '/api';
const INSERT = '/resignations/wf/insertBalance';

export class WorkForceScreenDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            detail: {},
            leaver: {},
            annualsGranted: "",
            annualsTaken: "",
            noShow: "",
            lostHours: "",
            inLieuDaysToTake: "",
            iex: ""
        }

        this.submitBalance = this.submitBalance.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchLeaverInfo = this.fetchLeaverInfo.bind(this);

    }

    ///////////////////////////////////////////////
    handleChange = (event) => {
        let state = {};
        state[event.target.id] = event.target.value;
        this.setState(state);
    }

    ///////////////////////////////////////////////
    componentDidMount() {
        const retDetail = this.props.location.state.detail;
        const wfData = retDetail.phase3;
        this.setState({
            detail: retDetail,
            iex: wfData.iex,
            annualsGranted: wfData.annualsGranted,
            annualsTaken: wfData.annualsTaken,
            noShow: wfData.noShow,
            inLieuDaysToTake: wfData.inLieuDaysToTake,
            lostHours: wfData.lostHours

        })
        this.fetchLeaverInfo(retDetail.staffId);
    }

    ///////////////////////////////////////////////
    fetchLeaverInfo(searchId){

        let QUERY = "/users/?id=" + searchId;
    
        fetch(API + QUERY, {
            method: "get",
            headers: {"Content-Type": "application/json"}
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            this.setState({
            leaver: data
            })
        })
        .catch((err) => {
            if(err)
            throw err;
        })
    
    }
    ///////////////////////////////////////////////
    submitBalance = (event) => {

        event.preventDefault();

        var phase3 = {
            "annualsGranted": this.state.annualsGranted,
            "annualsTaken": this.state.annualsTaken,
            "noShow": this.state.noShow,
            "lostHours": this.state.lostHours,
            "inLieuDaysToTake": this.state.inLieuDaysToTake,
            "iex": this.state.iex,
            "status": "done"
        }


        fetch(API + INSERT, {
            method: 'post',
            body: JSON.stringify({
                "staffId": this.state.detail.staffId,
                "phase3": phase3
            }),
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            if (response.status === 200) {
            toast.success("Data sent");
            }
            else if (response.status === 503) {
            toast.error("Error in db");
            }
            else {
            toast.error("Data cannot be sent");
            return undefined;
            }
        })
        .catch(err => {
            throw err;
        });
    }

    ///////////////////////////////////////////////
    render() {
        const { detail, leaver } = this.state;
        const phase1 = Object(detail.phase1);
        return (
            <div className = "container">
                <ToastContainer />
                <center style = {{margin: "25px"}}>
                    <LeaverDetails leaverDetail = {{leaverInfo: leaver, lastDay: phase1.lastWorkDay}}/>
                    <hr/>
                    <h4 className = "p-2 align-self-start">Leaver Balance</h4>
                    <div className = "d-flex flex-row justify-content-end">
                        <label htmlFor = "iex" className = "p-2">IEX</label>
                        <input 
                            id = "iex" 
                            type = "number" 
                            value = {this.state.iex} 
                            onChange = {this.handleChange} 
                            className = "p-2 form-control col-sm-2" 
                            />
                    </div>
                    <div className = "d-flex flex-column">
                        <div className = "p-2">
                            <Table bordered>
                                <thead>
                                    <tr style = {{backgroundColor: "#BE0002"}}>
                                        <th className = "text-white">Annuals Granted</th>
                                        <th className = "text-white">Annuals Taken</th>
                                        <th className = "text-white">No Show</th>
                                        <th className = "text-white">Lost Hours</th>
                                        <th className = "text-white">In Lieu Days to Take</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input style = {{width: "190px"}} type="number" className = "form-control" id="annualsGranted" value={this.state.annualsGranted} onChange={this.handleChange} /></td>
                                        <td><input style = {{width: "190px"}} type="number" className = "form-control" id="annualsTaken" value={this.state.annualsTaken} onChange={this.handleChange} /></td>
                                        <td><input style = {{width: "190px"}} type="number" className = "form-control" id="noShow" value={this.state.noShow} onChange={this.handleChange} /></td>
                                        <td><input style = {{width: "190px"}} type="number" className = "form-control" id="lostHours" value={this.state.lostHours} onChange={this.handleChange} /></td>
                                        <td><input style = {{width: "190px"}} type="number" className = "form-control" id="inLieuDaysToTake" value={this.state.inLieuDaysToTake} onChange={this.handleChange} /></td>
                                    </tr>
                                </tbody>
                            </Table>
                            </div>
                    </div>
                    <button
                        style = {{width: "100px"}}
                        onClick = {this.submitBalance} 
                        className = "btn btn-danger">
                        Submit
                    </button>
                </center>
            </div>
        )
    }


}
