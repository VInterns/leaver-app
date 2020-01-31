import React from "react";
import "./wf-screen-detail.css";

const API = 'http://localhost:8080/api/resignations';
const INSERT = '/wf/insertBalance';
/////////////////////////////////////////////////////////////////////////
export class WorkForceScreenDetail  extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            detail : {},
            annualsGranted : "",
            annualsTaken: "",
            noShow: "",
            lostHours: "",
            inLieuDaysToTake: "",
            iex: ""
        }

        this.submitBalance = this.submitBalance.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange=(event)=> {
        let state = {};
        state[event.target.id]=event.target.value;
        this.setState(state);
    }


    componentDidMount() {
        const retDetail = this.props.location.state.detail;
        this.setState({
            detail: retDetail
        })
 
    }

    submitBalance = (event) => {

        event.preventDefault();

        var phase3 = {
            "annualsGranted": this.state.annualsGranted,
            "annualsTaken": this.state.annualsTaken,
            "noShow": this.state.noShow,
            "lostHours": this.state.lostHours,
            "inLieuDaysToTake": this.state.inLieuDaysToTake,
            "iex": this.state.iex,
            "staffId": this.state.detail.staffId,
            "status": "done"
        }


        fetch(API + INSERT, {
            method: 'post',
            body: JSON.stringify({
                "staffId": this.state.detail.staffId,
                "phase3": phase3
            }),
            headers: {'Content-Type': 'application/json'}
        })
        .then((res) => {
                return res.json()
        })
        .then(data => {
            console.log(data);
        })
        .catch((err) => {
                console.log(err);
        })


    }

    render() {
        const {detail} = this.state;
        return(
            
            <div className = "detail-container">
                <div className = "top-panel">
                    <h2>Leaver Details</h2>
                    <div className = "leaver-info">
                        <div className = "row-info">
                            <label className = "key">Staff ID</label>
                            <label className = "value">{detail.staffId}</label>
                            <label className = "value2">Leaver Name</label>
                            <label className = "key2">{detail.name}</label>
                            <label className = "key3">Department</label>
                            <label className = "value3">{detail.department}</label>
                            <label className = "key4">Job Title</label>
                            <label className = "value4">{detail.jobTitle}</label>

                            <label className = "key5">Mobile Number</label>
                            <label className = "value5">{detail.phone}</label>
                            <label className = "key6">SAP Staff ID</label>
                            <label className = "value6">{detail.SAPStuffId}</label>
                            <label className = "key7">Manger</label>
                            <label className = "value7">{detail.manager}</label>
                            <label className = "key8">Cost Center</label>
                            <label className = "value8">{detail.costCenter}</label>
                            <label className = "key9">Hire Date</label>
                            <label className = "value9">{detail.hiringDate}</label>
                            <label className = "key0">Last Working Day</label>
                            <label className = "value0">{detail.lastWorkingDay}</label>
                        </div>
                    </div>
                </div>

                <label className="iex">IEX</label>
                <input type="number" id="iex"  value = {this.state.iex} onChange = {this.handleChange} className="iextxt"/>
                <h4>Leave Balance:</h4>

                <div>
                    <table id = "balanceDetails">
                        <tbody>
                            <tr>
                                <th>Annuals Granted</th>
                                <th>Annuals Taken</th>
                                <th>No Show</th>
                                <th>Lost Hours</th>
                                <th>In lieu days to take</th>
                              </tr>
                            <tr>
                                <td><input type="number" id="annualsGranted" value = {this.state.annualsGranted} onChange = {this.handleChange}/></td>
                                <td><input type="number" id="annualsTaken" value = {this.state.annualsTaken} onChange = {this.handleChange}/></td>
                                <td><input type="number" id="noShow" value = {this.state.noShow} onChange = {this.handleChange}/></td>
                                <td><input type="number" id="lostHours" value = {this.state.lostHours} onChange = {this.handleChange}/></td>
                                <td><input type="number" id="inLieuDaysToTake" value = {this.state.inLieuDaysToTake} onChange = {this.handleChange}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <button  onClick = {this.submitBalance} className = "bottom-panel">Submit</button>
                </div>
            </div>
        )
    }
    

}

/////////////////////////////////////////////////////////////////////////