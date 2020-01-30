import React, { Component } from 'react';
import axios from 'axios';
import { Table } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import queryString from 'query-string';

var phonebilledamount = 'yes';
export class CCConsumerActivation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Data: []
        };
        let url = this.props.location.search;
        let params = queryString.parse(url);
        var url2 = 'http://localhost:8080/api/consumer-activation/data?id=' + params.id;
        axios.get(url2)
            .then((retrieveData) => {
                this.setState({
                    Data: retrieveData.data,
                })
            })
    }
    //on click on choose file
    onChangeHandler = event => {
        var files = event.target.files;
        // if return true allow to setState
        console.log(files);
        this.setState({
            selectedFile: files,
            loaded: 0
        });
    };
    clickPost() {
        const data = new FormData();
        if (this.state.selectedFile == null || this.state.selectedFile.length !== 1) { //Handle when no file selected or more than one file
            toast.error("Please select one file and try again");
            return;
        }
        else if (this.inputrateplan.value == "" || this.inputcomment.value == "") {
            toast.error("Please fill all empty slots and try again");
            return;
        }
        for (var x = 0; x < this.state.selectedFile.length; x++) {
            data.append("file", this.state.selectedFile[x]);
        }
        let url = this.props.location.search;
        let params = queryString.parse(url);

        var url2 = 'http://localhost:8080/api/consumer-activation/data?id=' + params.id;
        axios
            .post("http://localhost:8080/api/consumer-activation/nationalid?id=" + params.id, this.state.selectedFile[0])
        fetch(url2, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                rateplan: this.inputrateplan.value,
                comment: this.inputcomment.value,
                phonebilledamount: phonebilledamount,
            })
        })
            .then(function (response) {
                toast.success("upload success");
            })
            .catch(function (error) {
                toast.error("upload fail");
            });
        this.inputrateplan.value = '';
        this.inputcomment.value = '';
        phonebilledamount = 'yes';
        this.props.history.push('cc-consumer-activation-table')

    };
    getval(sel) {
        phonebilledamount = sel.target.value;
    }
    render() {
        return (
            <div className="container">


                <center style={{ margin: '25px' }}>
                    <h3>CC Consumer Activation</h3>
                    <div>
                        <div>
                            {
                                this.state.Data.map(post => (
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>Staff ID:  {post.staffid}</td>
                                                <td>SAP Staff ID:  {post.sapstaffid}</td>
                                            </tr>
                                            <tr>
                                                <td>Leaver Name:  {post.leavername}</td>
                                                <td>Manager:  {post.manager}</td>
                                            </tr>
                                            <tr>
                                                <td>Department:  {post.department}</td>
                                                <td>Cost Center:  {post.costcenter}</td>
                                            </tr>
                                            <tr>
                                                <td>Job Title:  {post.jobtitle}</td>
                                                <td>Hiring Date:  {post.hiringdate}</td>
                                            </tr>
                                            <tr>
                                                <td>Mobile Number:  {post.mobilenumber}</td>
                                                <td>LastWorkingDay:  {post.lastworkingday}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                ))
                            }
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
                                ref={inrateplan => this.inputrateplan = inrateplan}
                                placeholder="Enter Rate Plan" />
                        </div>
                        <div>
                            <div>Has Phone Billed Amount</div>
                            <select onChange={this.getval}>
                                <option value="yes">yes</option>
                                <option value="no">no</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ margin: '15px' }}>
                            <div>Comment</div>
                            <input className="form-control" type="textarea" id="comment"
                                ref={incomment => this.inputcomment = incomment}
                                placeholder="Input Comment here" />
                        </div>
                        <button className="btn btn-primary" style={{ width: '100px' }}
                            onClick={() => {
                                this.clickPost()
                            }}>Submit</button>
                    </div>

                </center>
            </div>
        );
    }
}
