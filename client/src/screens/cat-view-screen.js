import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { ImageUploaderComponent, LeaverDetails } from '../components'

/////////////////////////////////////////////////////////////////////////
var phoneBilledAmount = 'yes';

  /////////////////////////////////////////////////////////////////////////
export class CCConsumerActivation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            lastWorkDay: "",
            nationalId: null
        };
        this.getData();
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


        var url2 = '/api/users/?id=' + id;
        axios.get(url2)
            .then((retrieveData) => {
                this.setState({
                    Data: retrieveData.data,
                });
            });
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
        //check if all data is given
        if (!this.state.nationalId) {
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
        return (
            <div className="container">
                <center style={{ margin: '25px' }}>
                    <div>
                        <LeaverDetails leaverDetail = {{leaverInfo: this.state.Data, lastDay: this.state.lastWorkDay}}/>
                        <hr />
                        <div className="form-group files">
                            <div>Upload Scanned copy of National ID </div>
                            <ImageUploaderComponent fileAddHandler={this.imageUploaderHandler} />
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
                <ToastContainer/>
            </div>
        );
    }
}
