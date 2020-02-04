import React, { Component } from 'react';
import axios from 'axios';
import { Table } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import queryString from 'query-string';

var phoneBilledAmount = 'yes';
export class CCConsumerActivation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            lastWorkDay: ""
        };
        this.getData();
    }
    //fetch data for the employee resignation form
    getData() {
        //let url = this.props.location.search;
        let params = this.props.match.params;

        let id = params.staffId;
        this.setState({
            lastWorkDay: params.lastWorkDay
        })

        if (id === undefined) {

            this.props.history.push('cc-consumer-activation-table')
        }


        var url2 = '/api/users/?id=' + id;
        axios.get(url2)
            .then((retrieveData) => {
                this.setState({
                    Data: retrieveData.data,
                });
            });
    }

    componentDidMount() {
        this.getData();
    }

    //on click on choose file
    onChangeHandler = event => {
        var files = event.target.files;
        this.setState({
            selectedFile: files
        });
    };

    clickSubmit() {
        //check if all data is given
        if (this.state.selectedFile == null || this.state.selectedFile.length !== 1) {
            toast.error("Please select one file and try again");
            this.inputRatePlan.value = '';
            this.inputComment.value = '';
            phoneBilledAmount = 'yes';

            return;
        }
        else if (this.inputRatePlan.value === "" || this.inputComment.value === "") {
            toast.error("Please fill all empty slots and try again");
            this.inputRatePlan.value = '';
            this.inputComment.value = '';
            phoneBilledAmount = 'yes';
            return;
        }

        // let url = this.props.location.search;
        //let params = queryString.parse(url);
        let params = this.props.match.params;

        let id = params.staffId;
        var url2 = '/api/resignations/data?id=' + id;
        axios.post("/api/resignations/national-id?id=" + id, this.state.selectedFile[0])

        //send data to the backend
        fetch(url2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                ratePlan: this.inputRatePlan.value,
                comment: this.inputComment.value,
                phoneBilledAmount: phoneBilledAmount,
                nationalId: this.state.selectedFile[0]
            })
        })
            //if success redirect to the cc-consumer-activation-table
            .then((response) => {
                this.props.history.push('cc-consumer-activation-table')
            })
            .catch(function (error) {
                toast.error("Upload Fail");
            });


    };

    //DROP DOWN(phone Billed Amount) change value
    getVal(sel) {
        phoneBilledAmount = sel.target.value;
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
                        <div>

                            <Table bordered hover>
                                <tbody>
                                    <tr>
                                        <td><span style = {{fontWeight: "bold"}}>Staff ID:</span> {this.state.Data.staffId}</td>
                                        <td><span style = {{fontWeight: "bold"}}>SAP Staff ID:</span>  {this.state.Data.sapStaffId}</td>
                                    </tr>
                                    <tr>
                                        <td><span style = {{fontWeight: "bold"}}>Leaver Name:</span>  {this.state.Data.name}</td>
                                        <td><span style = {{fontWeight: "bold"}}>Manager:</span>  {this.state.Data.managerName}</td>
                                    </tr>
                                    <tr>
                                        <td><span style = {{fontWeight: "bold"}}>Department:</span>  {this.state.Data.department}</td>
                                        <td><span style = {{fontWeight: "bold"}}>Cost Center: </span> {this.state.Data.costCenter}</td>
                                    </tr>
                                    <tr>
                                        <td><span style = {{fontWeight: "bold"}}>Job Title:</span>{this.state.Data.jobTitle}</td>
                                        <td><span style = {{fontWeight: "bold"}}>Hiring Date:</span>  {this.state.Data.hiringDate}</td>
                                    </tr>
                                    <tr>
                                        <td><span style = {{fontWeight: "bold"}}>Mobile Number: </span> {this.state.Data.mobile}</td>
                                        <td><span style = {{fontWeight: "bold"}}>LastWorkingDay:</span>  {this.state.lastWorkDay}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <hr/>
                        <div className="form-group files">
                            <div>Upload Scanned copy of National ID </div>
                            <input
                                type="file"
                                className="form-control"
                                multiple
                                onChange={this.onChangeHandler}
                            />
                        </div>
                        <div className="form-group" style={{ margin: '15px' }}>
                            <div>Rate Plan</div>
                            <input className="form-control" type="text" id="rateplan"
                                ref={inRatePlan => this.inputRatePlan = inRatePlan}
                                placeholder="Enter Rate Plan" />
                        </div>
                        <div>
                            <div>Has Phone Billed Amount</div>
                            <select onChange={this.getVal}>
                                <option value="yes">yes</option>
                                <option value="no">no</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ margin: '15px' }}>
                            <div>Comment</div>
                            <input className="form-control" type="textarea" id="comment"
                                ref={inComment => this.inputComment = inComment}
                                placeholder="Input Comment here" />
                        </div>
                        <button className="btn btn-danger" style={{ width: '100px' }}
                            onClick={() => {
                                this.clickSubmit()
                            }}>Submit</button>
                    </div>

                </center>
                <ToastContainer />
            </div>
        );
    }
}
