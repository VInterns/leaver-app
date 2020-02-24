import React, { Component } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { LeaverDetails } from '../components'

/////////////////////////////////////////////////////////////////////////
var phoneBilledAmount = 'yes';

  /////////////////////////////////////////////////////////////////////////
export class CCConsumerActivation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            lastWorkDay: "",
            nationalId: null,
            leaver: {}
        };
    }

    ///////////////////////////////////////////////
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


        // Employee Details
        let url = '/api/users/?id=' + id;
        fetch(url, {
            method: "GET",
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

        
        // Resignation Details
        var url2 = '/api/resignations/' + id;
        fetch(url2, {
            method: "GET",
            headers: {"Content-type": "application/json"}
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            this.setState({
                Data: data
            })
        })
        .catch((err) => {
            throw err;
        })
    }

    ///////////////////////////////////////////////
    componentDidMount() {
        this.getData();
    }

    ///////////////////////////////////////////////
    //on click on choose file
    onChangeHandler = event => {
        var files = event.target.files;
        this.setState({
            selectedFile: files
        });
    };

    ///////////////////////////////////////////////
    clickSubmit() {

        if (this.inputRatePlan.value === "" || this.inputComment.value === "") {
            toast.error("Please fill all empty slots and try again");
            this.inputRatePlan.value = '';
            this.inputComment.value = '';
            phoneBilledAmount = 'yes';
            return;
        }

        let params = this.props.match.params;
        let id = params.staffId;
        var url2 = '/api/resignations/data?id=' + id;

        fetch(url2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                ratePlan: this.inputRatePlan.value,
                comment: this.inputComment.value,
                phoneBilledAmount: phoneBilledAmount,
                nationalId: this.state.nationalId
            })
        }).then((response) => {
            this.props.history.push('/cc-consumer-activation-table')
        }).catch(function (error) {
            toast.error("Upload Fail");
        });


    };

    ///////////////////////////////////////////////
    //DROP DOWN(phone Billed Amount) change value
    getVal(sel) {
        phoneBilledAmount = sel.target.value;
    }

    ///////////////////////////////////////////////
    imageUploaderHandler = (file) => {
        this.setState({
            nationalId: {
                fileName: file.name,
                dataURL: file.dataURL,
                type: file.type,
                size: file.size
            }
        })
    }

    ///////////////////////////////////////////////
    render() {
        
        const {Data} = this.state;
        const Phase1 = Object(Data.phase1);
        const NationalIDImg = Object(Phase1.nationalIdImg);
        return (
            <div className="container">
                <center style={{ margin: '25px' }}>
                    <div>
                        <LeaverDetails leaverDetail = {{leaverInfo: this.state.leaver, lastDay: this.state.lastWorkDay}}/>
                        <hr />
                        <div className="form-group files">
                            <div>National ID </div>
                            <img
                                alt = {NationalIDImg.fileName} 
                                src = {NationalIDImg.dataURL} />
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
                                <option value="N/A">N/A</option>
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
                <ToastContainer/>
            </div>
        );
    }
}
