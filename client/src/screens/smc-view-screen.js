import React from 'react';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import { Input, Button } from 'reactstrap';


export class SMCView extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            headset: 0,
            keys: 0,
            ohda: 0,
            ohdaType: 0,
            comment: 0,
        };
    }




    handelHeadset = (e) => {
        this.setState({ headset: e.target.value });
    }


    handelKeys = (e) => {
        this.setState({ keys: e.target.value });
    }
    handelOhda = (e) => {
        this.setState({ ohda: e.target.value });
    }
    handelOhdaType = (e) => {
        this.setState({ ohdaType: e.target.value });
    }
    handelComment = (e) => {
        this.setState({ comment: e.target.value });
    }
    buttonHandel = () => {
        console.log("First: " + this.state.headset);
        console.log("Sec   : " + this.state.keys);
        console.log("Third: " + this.state.ohda);
    }

    render() {
        return (

            <div className="App">
                <header className="App-header" >
                    Customare Care (SMC)
    </header>

                <br />
                <hr />
                <div className="row">
                    <div className="leftFields">


                        <div className="records">

                            <div className="left">
                                <label>Staff ID: </label>
                            </div>
                            <div className="right">
                                112351
                    </div>

                        </div>
                        <div className="records">

                            <div className="left">
                                <label>Leaver Name: </label>
                            </div>
                            <div className="right">
                                Alaa Mohamed
                    </div>

                        </div>
                        <div className="records">

                            <div className="left">
                                <label>Department: </label>
                            </div>
                            <div className="right">
                                VIS
                    </div>

                        </div>
                        <div className="records">

                            <div className="left">
                                <label>Job Title: </label>
                            </div>
                            <div className="right">
                                Software Eng
                    </div>

                        </div>
                        <div className="records">

                            <div className="left">
                                <label>Mobile Number: </label>
                            </div>
                            <div className="right">
                                01252541354
                    </div>

                        </div>
                    </div>
                    <div className="rightFields">
                        <div className="records">

                            <div className="left">
                                <label>SAP Staff ID: </label>
                            </div>
                            <div className="right">
                                11913661
                     </div>

                        </div>
                        <div className="records">

                            <div className="left">
                                <label>Manager: </label>
                            </div>
                            <div className="right">
                                Manager Name
                     </div>

                        </div>
                        <div className="records">

                            <div className="left">
                                <label>Cost Center: </label>
                            </div>
                            <div className="right">
                                EG02023035
                     </div>

                        </div>
                        <div className="records">

                            <div className="left">
                                <label>Hiring Date: </label>
                            </div>
                            <div className="right">
                                10/10/2010
                     </div>

                        </div>
                        <div className="records">

                            <div className="left">
                                <label>Last Working Date: </label>
                            </div>
                            <div className="right">
                                28/1/2019
                     </div>

                        </div>
                    </div>

                </div>
                <hr />
                <div className="row">
                    <br />
                    <div className="leftFields">


                        <div className="records">

                            <div className="left">
                                <label>Returned Headset: </label>
                            </div>
                            <div className="right">
                                <Input type="select" className="select" name="select" onChange={this.handelHeadset}>
                                    <option value="0">Select Headset State..</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Input>

                            </div>

                        </div>
                        <div className="records">

                            <div className="left">
                                <label>Returned Keys: </label>
                            </div>
                            <div className="right">
                                <Input type="select" className="select" name="select" id="exampleSelect" onChange={this.handelKeys}>
                                    <option value="0">Select Keys State..</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Input>
                            </div>

                        </div>
                        <div className="records">

                            <div className="left">
                                <label>Returned 3ohda: </label>
                            </div>
                            <div className="right">
                                <Input type="select" className="select" name="select" id="exampleSelect" onChange={this.handelOhda}>
                                    <option value="0">Select 3ohda State..</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Input>
                            </div>

                        </div>

                        <div className="records">

                            <div className="left">
                                <label>3ohda Type: </label>
                            </div>
                            <div className="right">
                                <Input className="Input" placeholder="Enter The Type.." onChange={this.handelOhdaType} />
                            </div>

                        </div>

                        <div className="records">

                            <div className="left">
                                <label>Comment: </label>
                            </div>
                            <div className="right">
                                <Input type="textarea" name="text" placeholder="Enter Your Comment" id="exampleText" onChange={this.handelComment} />
                            </div>

                        </div>

                        <div className="records">


                            <div className="right">
                                <Button color="primary" className="px-0" onClick={this.buttonHandel}>Add Data..</Button>
                            </div>

                        </div>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

