import React, { Component } from 'react';
import axios from 'axios';
import { Table } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import queryString from 'query-string';

var phoneBilledAmount = 'yes';
export class CCConsumerActivation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Data: []
        };
        this.getData();
    }
    //fetch data for the employee resignation form
    getData() {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        var url2 = 'http://localhost:8080/api/users/?id=' + params.id;
        axios.get(url2)
            .then((retrieveData) => {
                console.log(retrieveData)
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

        let url = this.props.location.search;
        let params = queryString.parse(url);
        var url2 = 'http://localhost:8080/api/resignations/data?id=' + params.id;
        axios.post("http://localhost:8080/api/resignations/national-id?id=" + params.id, this.state.selectedFile[0])

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
                    <h3>CC Consumer Activation</h3>
                    <div>
                        <div>

                            <Table bordered hover>
                                <tbody>
                                    <tr>
                                        <td>Staff ID:  {this.state.Data.staffId}</td>
                                        <td>SAP Staff ID:  {this.state.Data.sapId}</td>
                                    </tr>
                                    <tr>
                                        <td>Leaver Name:  {this.state.Data.employeeName}</td>
                                        <td>Manager:  {this.state.Data.managerName}</td>
                                    </tr>
                                    <tr>
                                        <td>Department:  {this.state.Data.department}</td>
                                        <td>Cost Center:  {this.state.Data.costCenter}</td>
                                    </tr>
                                    <tr>
                                        <td>Job Title:  {this.state.Data.jobTitle}</td>
                                        <td>Hiring Date:  {this.state.Data.hiringDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Mobile Number:  {this.state.Data.mobNumber}</td>
                                        <td>LastWorkingDay:  {this.state.Data.lastWorkingDay}</td>
                                    </tr>
                                </tbody>
                            </Table>

                        </div>
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
                        <button className="btn btn-primary" style={{ width: '100px' }}
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
